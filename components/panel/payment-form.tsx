import { Transition } from "@headlessui/react";
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import moment from "moment";
import Link from "next/link";
import React, { FC, Fragment, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import {
  checkPaymentStatus,
  dataURItoBlob,
  mkGetReq,
  mkPostReq,
  openInNewTab,
  sentenceCase,
} from "../../utils/functions";
import FormGroup from "../form-group";
import InternationalInput from "../international-input";
import ListBox from "../list-box";
import { Modal } from "../modal";
import DocumentPreview from "./document-preview";
import FileUpload from "./file-upload";
import SwitchButton from "./switch-button";

const PaymentForm: FC<{ policy: any; onReturn?: () => void }> = ({ policy, onReturn }) => {
  console.log(policy);

  const [showPendingPaymentModal, setShowPendingPaymentModal] = useState<boolean>(false);
  const [showPaymentCompleteModal, setShowPaymentCompleteModal] = useState<boolean>(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string>("Payment successfully made");

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const _initiatePayment = async () => {
    console.log(policy.id);

    setShowPendingPaymentModal(true);

    // check if previous payment attempt was successful
    if (policy.pInitialPayment) {
      let payment_status = await checkPaymentStatus(policy.pInitialReference);
      if (payment_status === "success") {
        //ignore payment and refresh page content
        // initiatePayment("complete");
        setShowPendingPaymentModal(false);
        setPaymentSuccessMessage("Payment already made");
        setShowPaymentCompleteModal(true);
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
        // initiatePayment("start", initiate_payment_response.data.reference);
        openInNewTab(initiate_payment_response.data.authorization_url);

        console.log("start checking for payment status");
        let payment_status = null;
        let payment_check_interval = setInterval(async () => {
          console.log("check payment status");
          payment_status = await checkPaymentStatus(initiate_payment_response.data.reference);

          if (payment_status === "success") {
            setShowPendingPaymentModal(false);
            setPaymentSuccessMessage("Payment successful");
            setShowPaymentCompleteModal(true);
            _finalizePayment(policy.id);
            clearInterval(payment_check_interval);
          }
        }, 15_000);
        setTimeout(async () => {
          console.log("end checking for payment status");
          clearInterval(payment_check_interval);
        }, 300_000);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
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
    onReturn && onReturn();
  };

  useEffect(() => {
    let mounted = true;
    console.log(policy);

    return () => {
      mounted = false;
    };
  }, [policy]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <button
        className="px-3 py-1 text-gray-700 border border-primary-border flex flex-row items-center justify-center space-x-8 hover:bg-primary-main hover:text-dark rounded-md"
        onClick={onReturn}
      >
        <ChevronLeftIcon className="w-4 h-4" /> Back
      </button>

      <div className="w-full py-4 flex flex-col items justify-center space-y-8"></div>
      <div className="flex justify-center">
        <button className="bg-primary-main px-4 py-2 w-max" onClick={_initiatePayment}>
          Pay for Policy
        </button>
      </div>

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

export default PaymentForm;
