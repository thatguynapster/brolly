import React, { ChangeEvent, Children, FC, Fragment, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { checkPaymentStatus, mkGetReq, openInNewTab } from "../../utils/functions";
import { Modal } from "../modal";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";

const QuoteDetails: FC<{
  progress: number;
  policy: any;
  initiatePayment: (_status: "start" | "complete", _ref?: string) => void;
}> = ({
  progress,
  policy,
  initiatePayment, // start | complete
}) => {
  const { GLOBAL_OBJ } = useContext(AuthContext);

  const _initiatePayment = async () => {
    console.log(policy.id);

    // check if previous payment attempt was successful
    if (policy.pInitialPayment) {
      let payment_status = await checkPaymentStatus(policy.pInitialReference);
      if (payment_status === "success") {
        //ignore payment and refresh page content
        initiatePayment("complete");
        return;
      }
    }

    try {
      let initiate_payment_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurances/paystack/transaction/initialize/`,
        queries: `insuranceId=${policy.id}`,
        token: GLOBAL_OBJ.token,
      });
      console.log(initiate_payment_response);

      if (!initiate_payment_response.data) {
        toast.error(initiate_payment_response.title);
      } else {
        // handle success
        initiatePayment("start", initiate_payment_response.data.reference);
        openInNewTab(initiate_payment_response.data.authorization_url);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    console.log(progress, policy);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4">
      {policy ? (
        <div className="py-4 flex flex-col items justify-center space-y-8">
          {/* <QuoteProgress progress={2} /> */}
          <h1 className="text-center text-md">
            Annual Premium: <span className="font-semibold">GHS {policy?.totalPremium?.toFixed(2)}</span>
          </h1>

          {/* <div className="flex flex-col divide-y divide-gray-200">
            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Cover</p>
              <p className="font-semibold text-right">GHS {policy?.cover?.toFixed(2)}</p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Excess</p>
              <p className="font-semibold text-right">GHS {policy?.excess?.toFixed(2)}</p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>TPPDL</p>
              <p className="font-semibold text-right">GHS {policy?.tppdl?.toFixed(2)}</p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Pre-approval Repair Limit</p>
              <p className="font-semibold text-right">GHS {policy?.tppdl?.toFixed(2)}</p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>PA Cover for Driver &amp; Vehicle Owner</p>
              <p className="font-semibold text-right">GHS {policy?.paCover?.toFixed(2)}</p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Courtesy for Service</p>
              <p className="font-semibold text-right">{policy?.courtesyForService ? "Yes" : "No"}</p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Breakdown Tow Service</p>
              <p className="font-semibold text-right"> {policy?.breakdownTowService ? "Yes" : "No"} </p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Roadside Assistance</p>
              <p className="font-semibold text-right"> {policy?.roadsideAssistance ? "Yes" : "No"} </p>
            </div>

            <div className="p-2 w-full flex flex-row items-between justify-between">
              <p>Other Benefits</p>
              <p className="font-semibold text-right"> {policy?.otherBenefits} </p>
            </div>
          </div> */}

          {/* render below details when payment is complete */}
          {policy?.status === "PAYMENT_COMPLETED" && (
            <div className="flex flex-col items-center divide-y divide-gray-200">
              show form for quote and allow editing some fields
            </div>
          )}

          <div className="flex justify-center">
            {policy?.status === "QUOTE_CONFIRMED" && (
              <button className="bg-primary-main px-4 py-2 w-max" onClick={_initiatePayment}>
                Pay for Policy
              </button>
            )}
            {policy?.status === "PAYMENT_COMPLETED" && (
              <button className="bg-primary-main px-4 py-2 w-max">Upload Documents</button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-6 w-6 text-primary-main"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default QuoteDetails;
