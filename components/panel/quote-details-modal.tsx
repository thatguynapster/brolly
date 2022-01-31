import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { ChangeEvent, Children, FC, Fragment, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { checkPaymentStatus, mkGetReq, openInNewTab } from "../../utils/functions";
import FormGroup from "../form-group";
import { Modal } from "../modal";
import { Navbar } from "./navbar";
import ProgressSteps from "./progress-steps";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";
import VerifyPolicyDetails from "./verify-policy-details";

const QuoteDetails: FC<{
  progress: number;
  policy: any;
  initiatePayment: (_status: "start" | "complete", _ref?: string) => void;
}> = ({
  progress,
  policy,
  initiatePayment, // start | complete
}) => {
  console.log(policy);
  const { GLOBAL_OBJ } = useContext(AuthContext);

  // quote details states
  const [firstName, setFirstName] = useState<string>(policy?.firstName ?? "first name");
  const [lastName, setLastName] = useState<string>(policy?.lastName);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userOccupation, setUserOccupation] = useState<string>("");
  const [premiumStartDate, setPremiumStartDate] = useState<any>(""); // TODO get required format and set appropriate type

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

    if (policy) {
      setFirstName(policy.firstName);
      setLastName(policy.lastName);
      setPhoneNumber(policy.phoneNumber);
      setEmail(policy.email);
      setUserAddress(policy.userAddress);
      setUserOccupation(policy.userOccupation);
      setPremiumStartDate(policy.startDate);
    }

    return () => {
      mounted = false;
    };
  }, [policy]);

  return (
    <div className="p-4">
      {policy ? (
        <div className="py-4 flex flex-col items justify-center space-y-8">
          {/* <QuoteProgress progress={2} /> */}
          {policy?.status !== "PAYMENT_COMPLETED" && (
            <h1 className="text-center text-md">
              Annual Premium: <span className="font-semibold">GHS {policy?.totalPremium?.toFixed(2)}</span>
            </h1>
          )}

          {/* render below details when payment is complete */}
          {policy?.status === "PAYMENT_COMPLETED" && <VerifyPolicyDetails policy={policy} />}

          {policy?.status === "QUOTE_CONFIRMED" && (
            <div className="flex justify-center">
              <button className="bg-primary-main px-4 py-2 w-max" onClick={_initiatePayment}>
                Pay for Policy
              </button>
            </div>
          )}
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
