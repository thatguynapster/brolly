import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { mkGetReq, mkPostReq, sentenceCase } from "../../utils/functions";
import { Modal } from "../modal";
import QuotesCard from "./quotes-card";
import DocumentPreview from "./document-preview";
import DocumentView from "./document-view";
import { CheckCircleIcon } from "@heroicons/react/outline";

const PoliciesView: FC<{ show?: boolean }> = ({ show }) => {
  const [policies, setPolicies] = useState<any>(null);

  const [documentToView, setDocumentToView] = useState<{
    doc: string;
    type: "image" | "document" | undefined;
  } | null>(null);
  const [viewDocument, setViewDocument] = useState<boolean>(false);

  const [currentView, setCurrentView] = useState<"index" | "policy_details">(
    "index"
  );

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
  const [insuranceDocs, setInsuranceDocs] = useState<
    { name: string; type: string }[] | null
  >(null);
  const [showClaimResponseModal, setShowClaimResponseModal] =
    useState<boolean>(false);
  const [claimResponseText, setClaimResponseText] = useState<string>("");

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const _getUserInsurances = async () => {
    setPolicies(null);
    try {
      let user_policies_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurances/user`,
        queries: `userId=${GLOBAL_OBJ.data.user_id}`,
        token: GLOBAL_OBJ.token,
      });
      // console.log(user_policies_response);

      if (user_policies_response.status) {
        toast.error(user_policies_response.title);
      } else {
        // handle success

        // user_policies_response.map((_r: any, i: any) => {
        //   console.log(
        //     _r.status,
        //     statusList.indexOf(_r.status),
        //     statusList.indexOf("POLICY_APPROVED")
        //   );
        // });

        let quotes = user_policies_response.filter(
          (_r: any) =>
            statusList.indexOf(_r.status) >=
            statusList.indexOf("POLICY_APPROVED")
        );
        console.log(quotes);

        setPolicies(quotes);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  const _getPolicyDetails = async (policy_id: string) => {
    setPolicyDetails(null);
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

  const _getInsuranceDocuments = async (policy_id: string) => {
    try {
      let insurance_documents_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurance-documents/insurance/`,
        queries: `insuranceId=${policy_id}`,
        token: GLOBAL_OBJ.token,
      });
      console.log(insurance_documents_response);

      if (insurance_documents_response.httpStatus) {
        toast.error(insurance_documents_response.title);
      } else {
        // filter out unneeded documents

        let display_docs = insurance_documents_response.filter(
          (_d: any) =>
            _d.docType === "CERTIFICATE" ||
            _d.docType === "SUMMARY" ||
            _d.docType === "CONTRACT" ||
            _d.docType === "SCHEDULE"
        );
        console.log(display_docs);

        let temp_docs: { name: string; type: string }[] = [];
        display_docs.map((_d: any) => {
          temp_docs.push({ name: _d.docURL, type: _d.docType });
        });
        console.log(temp_docs);
        setInsuranceDocs(temp_docs);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  const _makeClaim = async () => {
    try {
      let insurance_claim_response = await mkPostReq({
        endpoint: `/api/insurances/claim/${policyDetails.id}`,
        queries: ``,
        token: GLOBAL_OBJ.token,
        method: "post",
        data: null,
        isJSON: true,
      });
      // console.log(insurance_claim_response);

      if (insurance_claim_response.status) {
        toast.error(insurance_claim_response.title);
      } else {
        // handle success
        setShowPolicyDetails(false);
        setShowClaimResponseModal(true);
        setClaimResponseText(insurance_claim_response.message);
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
  }, [GLOBAL_OBJ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[calc(100vh-168px)] overflow-auto">
        {currentView === "index" &&
          policies?.map((_pol: any, i: string) => {
            return (
              <QuotesCard
                key={i}
                policy={_pol}
                showDetails={(policy_id, next_step) => {
                  console.log(policy_id, next_step);
                  _getPolicyDetails(policy_id);
                  _getInsuranceDocuments(policy_id);
                  //   setCurrentView("policy_details");
                  setShowPolicyDetails(true);
                }}
                view="policy"
              />
            );
          })}
      </div>

      {/* Policy details modal */}
      <Modal
        show={showPolicyDetails}
        onClose={() => {
          setShowPolicyDetails(false);
        }}
      >
        {policyDetails && (
          <div className=" pb-6 w-full flex flex-col space-y-8">
            <div className="p-8 flex flex-row items-center justify-center bg-primary-surface space-x-4 rounded-b-4xl shadow-md">
              <div className="bg-white rounded-full shadow-lg w-16">
                <img src="/img/car.svg" className="" alt="Image" />
              </div>
              <div className="flex flex-col text-center">
                <h1 className="font-bold text-center text-xl uppercase">
                  {policyDetails?.policyNumber}
                </h1>
              </div>
            </div>
            <div className="px-6 flex flex-col space-y-2.5">
              <h3 className="text-center font-semibold">
                Annual Premium: GHS {policyDetails?.outRightPremium}
              </h3>
              <p>
                Cover:{" "}
                {policyDetails?.protectionType
                  ? `${sentenceCase(policyDetails?.protectionType)}`
                  : ""}
              </p>
              <p>
                Excess:{" "}
                {policyDetails?.excess ? `${policyDetails?.excess}%` : ""}
              </p>
              <p>
                TPPDL:{" "}
                {policyDetails?.tppdl ? `GHS ${policyDetails?.tppdl}` : ""}
              </p>
              <p>
                Pre-approval Repair Limit:{" "}
                {policyDetails?.preApprovedRepairLimit
                  ? `GHS ${policyDetails?.preApprovedRepairLimit}`
                  : ""}
              </p>
              <p>
                PA Cover for Driver &amp; Vehicle Owner:{" "}
                {policyDetails?.paCover ? `GHS ${policyDetails?.paCover}` : ""}
              </p>
              <p>
                Courtesy for Service:{" "}
                {policyDetails?.courtesyCarService ? "Yes" : "No"}
              </p>
              <p>
                Breakown Tow Service:{" "}
                {policyDetails?.breakdownTowService ? "Yes" : "No"}
              </p>
              <p>
                Roadside Assistance:{" "}
                {policyDetails?.roadsideAssistance ? "Yes" : "No"}
              </p>
              <p>Other Benefits: {policyDetails?.otherBenefits}</p>
            </div>
            <hr />
            <div className="px-8">
              {/* {insuranceDocs
                  ? insuranceDocs.map((_doc: any, i: any) => {
                      return (
                        <DocumentPreview documents={insuranceDocs[0]} key={i} />
                      );
                    })
                  : null} */}
              <DocumentPreview
                documents={insuranceDocs}
                onView={(_doc: string, _type?: "image" | "document") => {
                  setDocumentToView({ doc: _doc, type: _type });
                  setShowPolicyDetails(false);
                  setViewDocument(true);
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              {(policyDetails.status === "COMPLETED" ||
                policyDetails.status === "POLICY_APPROVED") && (
                <button
                  className="whitespace-nowrap text-base font-medium text-dark border border-primary-main hover:bg-primary-border py-2 px-6 shadow-sm flex justify-center items-center space-x-4 rounded-lg capitalize"
                  onClick={_makeClaim}
                >
                  make claim
                </button>
              )}
              <button
                className="whitespace-nowrap text-base font-medium text-dark bg-primary-main hover:bg-primary-border py-2 px-6 border-0 shadow-sm flex justify-center items-center space-x-4 rounded-lg"
                onClick={() => {
                  setShowPolicyDetails(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* END Policy details modal */}

      {/* show document view modal  */}
      <DocumentView
        document={documentToView?.doc}
        show={viewDocument}
        type={documentToView?.type}
        onClose={() => {
          setViewDocument(false);
          setShowPolicyDetails(true);
        }}
      />
      {/* END show document view modal */}

      {/* Claim response modal */}
      <Modal
        show={showClaimResponseModal}
        onClose={() => {
          setShowClaimResponseModal(false);
        }}
      >
        <div className="p-4 flex flex-col items-center justify-center space-y-8">
          <CheckCircleIcon className="text-success-main w-48 h-48" />
          <p className="text-lg font-semibold text-center">
            {claimResponseText}
          </p>

          <button
            className="whitespace-nowrap text-base font-medium text-dark bg-primary-main hover:bg-primary-border py-2 px-6 border-0 shadow-sm flex justify-center items-center space-x-4 rounded-lg"
            onClick={() => {
              setShowClaimResponseModal(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      {/* END Claim response modal */}
    </div>
  );
};

export default PoliciesView;
