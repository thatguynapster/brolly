import React, { FC, useEffect, useState } from "react";
import { sentenceCase } from "../../utils/functions";

const QuotesCard: FC<{
  policy: any;
  view?: string;
  showDetails: (_pol: string, next_step: string) => void;
}> = ({ policy, view, showDetails }) => {
  const [isAdminAction, setIsAdminAction] = useState<boolean>(false);
  const [nextStep, setNextStep] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    // console.log(policy);

    // figure out next quote step
    switch (policy.status) {
      case "QUOTE_REQUESTED":
        setIsAdminAction(true);
        setNextStep("quote_confirmation");
        break;
      case "QUOTE_CONFIRMED":
        setNextStep("verify_details");
        break;
      case "DETAILS_VERIFIED":
        setNextStep("accept_mandate");
        break;
      case "MANDATE_FORM_COMPLETED":
        setNextStep("accept_agreement");
        break;
      case "AGREEMENT_SIGNED":
        setNextStep("payment");
        break;
      case "PAYMENT_COMPLETED":
        setNextStep("submit_documents");
        break;
      case "DOCUMENTS_SUBMITTED":
        setIsAdminAction(true);
        setNextStep("documents_verification");
        break;
      case "DOCUMENTS_VERIFIED":
        setIsAdminAction(true);
        setNextStep("policy_approval");
        break;
      case "POLICY_APPROVED":
        setNextStep("completed");
        break;
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="flex flex-col bg-white p-4 rounded-lg group border border-transparent hover:border-primary-border cursor-pointer"
      onClick={() => {
        showDetails(policy.id, nextStep);
      }}
    >
      <h1 className="font-semibold">Brolly Car</h1>
      <h1 className="">
        Cover:{" "}
        <span className="font-semibold">
          {sentenceCase(policy.protectionType)}
        </span>
      </h1>
      <p className="text-gray-700">
        Policy Number:{" "}
        <span className="font-semibold uppercase">{policy.policyNumber}</span>
      </p>
      <p className="text-gray-700">
        Vehicle Registration: <span className="font-semibold">{policy.registrationNum}</span>
      </p>

      {view !== "policy" && (
        <p className="mt-4">
          {isAdminAction ? null : "Action required: "}
          <span className="px-2 py-1 bg-gray-200 rounded-md capitalize">
            {`${nextStep.replaceAll("_", " ")} ${
              isAdminAction ? "in progress" : ""
            }`}
          </span>
        </p>
      )}
    </div>
  );
};

export default QuotesCard;
