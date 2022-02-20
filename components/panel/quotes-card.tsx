import React, {
  ChangeEvent,
  Children,
  FC,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";
import moment from "moment";
import { sentenceCase } from "../../utils/functions";

const QuotesCard: FC<{
  policy: any;
  view?: string;
  showDetails: (_pol: string, next_step: string) => void;
}> = ({ policy, view, showDetails }) => {
  const [nextStep, setNextStep] = useState<string>("");
  useEffect(() => {
    let mounted = true;

    // console.log(policy);

    // figure out next quote step
    switch (policy.status) {
      case "QUOTE_REQUESTED":
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
        setNextStep("documents_verification");
        break;
      case "DOCUMENTS_VERIFIED":
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

      {view !== "policy" && (
        <p className="mt-4">
          Action required:{" "}
          <span className="px-2 py-1 bg-gray-200 rounded-md capitalize">
            {nextStep.replaceAll("_", " ")}
          </span>
        </p>
      )}
    </div>
  );
};

export default QuotesCard;
