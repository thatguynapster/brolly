import React, { ChangeEvent, Children, FC, Fragment, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";
import moment from "moment";

const QuotesCard: FC<{ policy: any; showDetails: (_pol: string, next_step: string) => void }> = ({
  policy,
  showDetails,
}) => {
  const [nextStep, setNextStep] = useState<string>("");
  useEffect(() => {
    let mounted = true;

    console.log(policy);

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
      <h1 className="font-semibold">{policy.protectionType}</h1>
      <p className="text-gray-700">
        Premium: <span>GHS {policy.totalPremium?.toFixed(2)}</span>
      </p>
      {/* <p className={`w-max rounded-md`}>
        Renewal Date: {moment(policy.startTime).add("1", "years").subtract("1", "days").format("DD MMM, YYYY")}
      </p> */}

      <p className="mt-4">
        Action required: <span className="px-2 py-1 bg-gray-200 rounded-md capitalize">{nextStep.replaceAll("_", " ")}</span>
      </p>
    </div>
  );
};

export default QuotesCard;
