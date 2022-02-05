import { CheckCircleIcon } from "@heroicons/react/outline";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { checkPaymentStatus, mkGetReq } from "../../utils/functions";
import { Modal } from "../modal";
import QuoteDetails from "./quote-details";
import ProgressSteps from "./progress-steps";
import QuotesCard from "./quotes-card";
import MandateForm from "./mandate-form";

const QuotesView: FC<{ show: boolean }> = ({ show }) => {
  const [policies, setPolicies] = useState<any>(null);

  const [currentView, setCurrentView] = useState<"index" | "quote_details" | "mandate_form" | "agreement_form">(
    "index"
  );

  const [policyDetails, setPolicyDetails] = useState<any>(null);
  const [showPolicyDetails, setShowPolicyDetails] = useState<boolean>(false);
  const [showPendingPaymentModal, setShowPendingPaymentModal] = useState<boolean>(false);
  const [showPaymentCompleteModal, setShowPaymentCompleteModal] = useState<boolean>(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string>("Payment successfully made");
  const [showUnconfirmedQuoteModal, setShowUnconfirmedQuoteModal] = useState<boolean>(false);

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
        setPolicies(user_policies_response);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
    }
  };

  const _getQuoteDetails = async (policy_id: string) => {
    try {
      let policy_details_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurances/${policy_id}`,
        queries: "",
        token: GLOBAL_OBJ.token,
      });
      console.log(policy_details_response);

      if (policy_details_response.httpStatus) {
        toast.error(policy_details_response.title);
      } else {
        // handle success
        setPolicyDetails(policy_details_response);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
    }
  };

  const _initiatePayment = async () => {
    console.log(policyDetails.id);

    // check if previous payment attempt was successful
    if (policyDetails.pInitialPayment) {
      let payment_status = await checkPaymentStatus(policyDetails.pInitialReference);
      if (payment_status === "success") {
        //ignore payment and refresh page content
        // initiatePayment("complete");
        return;
      }
    }
  };

  const _finalizePayment = async (policy_id: string) => {
    toast.info("Finalizing payment...");

    try {
      await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurances/paystack/transaction/finish/`,
        queries: `insuranceId=${policy_id}`,
        token: GLOBAL_OBJ.token,
      });
    } catch (error) {
      console.log(error);
    }
    _getUserInsurances();
  };

  useEffect(() => {
    let mounted = true;

    console.log(GLOBAL_OBJ.data?.user_id);
    GLOBAL_OBJ.isLoggedIn && GLOBAL_OBJ.data?.user_id && _getUserInsurances();

    return () => {
      mounted = false;
    };
  }, [GLOBAL_OBJ.data]);

  return (
    <div className={`${!show && "hidden"}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentView === "index" && policies ? (
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
                    // case "payment":
                    //   _initiatePayment();
                    //   break;
                  }
                  // setShowPolicyDetails(true);
                }}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>

      {currentView === "quote_details" && (
        <>
          <QuoteDetails
            policy={policyDetails}
            initiatePayment={(_status, _ref) => {
              console.log(_status, _ref);
              // setShowPolicyDetails(false);
              switch (_status) {
                case "start":
                  setShowPendingPaymentModal(true);
                  // check payment status every 30s for 5mins
                  console.log("start checking for payment status");
                  let payment_status = null;
                  let payment_check_interval = setInterval(async () => {
                    console.log("check payment status");
                    payment_status = await checkPaymentStatus(String(_ref));

                    if (payment_status === "success") {
                      setShowPendingPaymentModal(false);
                      setShowPaymentCompleteModal(true);
                      setPaymentSuccessMessage("Payment successful");
                      _finalizePayment(policyDetails.id);
                      clearInterval(payment_check_interval);
                    }
                  }, 15_000);
                  setTimeout(async () => {
                    console.log("end checking for payment status");
                    clearInterval(payment_check_interval);
                  }, 300_000);
                  break;
                case "complete":
                  setPaymentSuccessMessage("Payment already made.");
                  _finalizePayment(policyDetails.id);
                  setShowPaymentCompleteModal(true);
                  break;
              }
            }}
            onClose={_getUserInsurances}
            onReturn={() => {
              setCurrentView("index");
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
        />
      )}

      {currentView === "agreement_form" && <></>}

      {/* Unconfirmed quote modal */}
      <Modal
        show={showUnconfirmedQuoteModal}
        onClose={() => {
          setShowUnconfirmedQuoteModal(false);
        }}
      >
        <div className="p-4 flex items-center justify-center">
          <p className="font-semibold text-lg text-center">
            A representative will be in touch to confirm the quote, then you can proceed
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
          <p className="font-semibold text-lg">Wating for payment confirmation</p>
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
          <h2 className="text-center font-semibold text-md">{paymentSuccessMessage}</h2>
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
    </div>
  );
};

export default QuotesView;
