import { CheckCircleIcon, XIcon } from "@heroicons/react/outline";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { checkPaymentStatus, mkGetReq } from "../../utils/functions";
import { Modal } from "../modal";
import QuoteDetails from "./quote-details";
import ProgressSteps from "./progress-steps";
import QuotesCard from "./quotes-card";
import MandateForm from "./mandate-form";
import AgreementForm from "./agreement-form";
import PaymentForm from "./payment-form";
import CheckPremium from "../check-premium";
import PremiumRequest from "./premium-request";

const QuotesView: FC<{}> = ({}) => {
  const [policies, setPolicies] = useState<any>(null);

  const [currentView, setCurrentView] = useState<
    "index" | "quote_details" | "mandate_form" | "agreement_form" | "payment"
  >("index");

  const statusList = [
    "QUOTE_REQUESTED",
    "QUOTE_CONFIRMED",
    "DETAILS_VERIFIED",
    "MANDATE_FORM_COMPLETED",
    "AGREEMENT_SIGNED",
    "PAYMENT_COMPLETED",
    "DOCUMENTS_SUBMITTED",
    "DOCUMENTS_VERIFIED",
    "POLICY_APPROVED",
  ];

  const [policyDetails, setPolicyDetails] = useState<any>(null);
  const [showPolicyDetails, setShowPolicyDetails] = useState<boolean>(false);
  const [showPendingPaymentModal, setShowPendingPaymentModal] =
    useState<boolean>(false);
  const [showPaymentCompleteModal, setShowPaymentCompleteModal] =
    useState<boolean>(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string>(
    "Payment successfully made"
  );
  const [showUnconfirmedQuoteModal, setShowUnconfirmedQuoteModal] =
    useState<boolean>(false);
  const [showQuoteForm, setShowQuoteForm] = useState<boolean>(false);
  const [premiumData, setPremiumData] = useState<any>({});

  const [showPremiumRequestModal, setShowPremiumRequestModal] =
    useState<boolean>(false);
  const [showPremiumRequestResponseModal, setShowPremiumRequestResponseModal] =
    useState<boolean>(false);

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const _getUserInsurances = async () => {
    setPolicies(null);
    try {
      let user_policies_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurances/user`,
        queries: `userId=${GLOBAL_OBJ.data.user_id}`,
        token: GLOBAL_OBJ.token,
      });
      console.log(user_policies_response);

      if (user_policies_response.status) {
        toast.error(user_policies_response.title);
      } else {
        // handle success

        let quotes = user_policies_response.filter(
          (_r: any) =>
            statusList.indexOf(_r.status) <
            statusList.indexOf("POLICY_APPROVED")
        );
        // console.log(quotes);

        setPolicies(quotes);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  const _getQuoteDetails = async (policy_id: string) => {
    try {
      let policy_details_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurances/${policy_id}`,
        queries: "",
        token: GLOBAL_OBJ.token,
      });
      // console.log(policy_details_response);

      if (policy_details_response.httpStatus) {
        toast.error(policy_details_response.title);
      } else {
        // handle success
        setPolicyDetails(policy_details_response);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    console.log(GLOBAL_OBJ, GLOBAL_OBJ.isLoggedIn && GLOBAL_OBJ.data?.user_id);
    if (mounted) {
      if (GLOBAL_OBJ.isLoggedIn) {
        if (GLOBAL_OBJ.data?.user_id) {
          _getUserInsurances();
        }
      }
      // GLOBAL_OBJ.isLoggedIn && GLOBAL_OBJ.data?.user_id && _getUserInsurances();
    }

    return () => {
      mounted = false;
    };
  }, [GLOBAL_OBJ.data]);

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-end">
        <button
          className="whitespace-nowrap text-base font-medium hover:text-gray-900 bg-primary-main py-2 px-4 border-0 shadow-sm flex items-center space-x-4 rounded-md"
          onClick={() => {
            setShowQuoteForm(true);
          }}
        >
          Get Quote
        </button>
      </div>

      {currentView === "index" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-168px)] overflow-auto">
          {currentView === "index" &&
            policies &&
            policies.map((_pol: any, i: string) => {
              return (
                <QuotesCard
                  key={i}
                  policy={_pol}
                  showDetails={(policy_id, next_step) => {
                    console.log(policy_id, next_step);
                    _getQuoteDetails(policy_id);
                    switch (next_step) {
                      case "quote_confirmation":
                        setShowUnconfirmedQuoteModal(true);
                        break;
                      case "verify_details":
                        setCurrentView("quote_details");
                        break;
                      case "accept_mandate":
                        setCurrentView("mandate_form");
                        break;
                      case "accept_agreement":
                        setCurrentView("agreement_form");
                        break;
                      case "payment":
                        setCurrentView("payment");
                        break;
                    }
                    // setShowPolicyDetails(true);
                  }}
                />
              );
            })}
        </div>
      )}

      {/* progress view for forms */}
      {currentView !== "index" && null}

      {currentView === "quote_details" && (
        <>
          <QuoteDetails
            policy={policyDetails}
            onReturn={() => {
              setCurrentView("index");
              _getUserInsurances();
            }}
            onProceed={() => {
              setCurrentView("mandate_form");
              _getUserInsurances();
            }}
          />
        </>
      )}

      {currentView === "mandate_form" && (
        <MandateForm
          policy={policyDetails}
          onReturn={() => {
            setCurrentView("index");
            _getUserInsurances();
          }}
          onProceed={() => {
            setCurrentView("agreement_form");
            _getUserInsurances();
          }}
        />
      )}

      {currentView === "agreement_form" && (
        <AgreementForm
          policy={policyDetails}
          onReturn={() => {
            setCurrentView("index");
            _getUserInsurances();
          }}
          onProceed={() => {
            setCurrentView("payment");
            _getUserInsurances();
          }}
        />
      )}

      {currentView === "payment" && (
        <PaymentForm
          policy={policyDetails}
          onReturn={() => {
            setCurrentView("index");
            _getUserInsurances();
          }}
        />
      )}

      {/* Unconfirmed quote modal */}
      <Modal
        show={showUnconfirmedQuoteModal}
        onClose={() => {
          setShowUnconfirmedQuoteModal(false);
        }}
      >
        <div className="p-4 flex items-center justify-center">
          <p className="font-semibold text-lg text-center">
            A representative will be in touch to confirm the quote, then you can
            proceed
          </p>
        </div>
      </Modal>
      {/* END Unconfirmed quote modal */}

      <Modal
        show={showPendingPaymentModal}
        onClose={() => {
          setShowPendingPaymentModal(false);
        }}
      >
        <div className="p-4 flex items-center justify-center">
          <p className="font-semibold text-lg">
            Wating for payment confirmation
          </p>
        </div>
      </Modal>

      <Modal
        show={showPaymentCompleteModal}
        onClose={() => {
          setShowPaymentCompleteModal(false);
        }}
      >
        <div className="flex flex-col px-4 py-8 space-y-8 items-center">
          <CheckCircleIcon className="text-success-main w-48 h-48" />
          <h2 className="text-center font-semibold text-md">
            {paymentSuccessMessage}
          </h2>
          <button
            className="bg-primary-main px-4 py-2"
            onClick={() => {
              setShowPaymentCompleteModal(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>

      <Modal
        show={showQuoteForm}
        onClose={(ev: any) => {
          setShowQuoteForm(false);
        }}
        className="z-50"
      >
        <XIcon
          className="absolute top-0 right-0 m-4 w-5 h-5 cursor-pointer"
          onClick={() => {
            setShowQuoteForm(false);
          }}
        />
        <CheckPremium
          isModal={true}
          onRequestCover={(_data) => {
            // console.log(_data);
            setPremiumData(_data);
            setShowQuoteForm(false);
            setShowPremiumRequestModal(true);
          }}
        />
      </Modal>

      <Modal
        show={showPremiumRequestModal}
        onClose={(ev: any) => {
          setShowPremiumRequestModal(false);
        }}
        className="z-50"
      >
        <XIcon
          className="absolute top-0 right-0 m-4 w-5 h-5 cursor-pointer"
          onClick={() => {
            setShowPremiumRequestModal(false);
          }}
        />
        <PremiumRequest
          data={premiumData}
          onClose={() => {
            setShowPremiumRequestModal(false);
            setShowPremiumRequestResponseModal(true);
            _getUserInsurances();
          }}
        />
      </Modal>

      <Modal
        show={showPremiumRequestResponseModal}
        onClose={() => {
          setShowPremiumRequestResponseModal(false);
        }}
      >
        <div className="flex flex-col px-4 py-8 space-y-8 items-center">
          <CheckCircleIcon className="text-success-main w-48 h-48" />
          <h2 className="text-center font-semibold text-md">
            Insurance premium successfully requested. A representative will be
            in touch soon.
          </h2>
          <button
            className="bg-primary-main px-4 py-2"
            onClick={() => {
              setShowPremiumRequestResponseModal(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QuotesView;
