import React, { FC, useEffect, useState } from "react";
import type { NextPage } from "next";
import FormGroup from "../components/form-group";
import { validateEmail } from "../utils/functions";
import { toast } from "react-toastify";

const JoinWaitlist: FC<{ status: any; message: any; onValidated: (formData: any) => void }> = ({
  status,
  message,
  onValidated,
}) => {
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("Subscribe to Join");

  async function _handleSubmit() {
    if (!validateEmail(email)) {
      toast.error("Provide a valid email");
      return;
    }
    if (phone === "") {
      toast.error("Enter phone number");
      return;
    }

    onValidated({
      MERGE0: email,
      MERGE1: phone,
    });
  }
  console.log(status);

  useEffect(() => {
    console.log(status);
    switch (status) {
      case "error":
        toast.error("Failed to join waitlist");
        setButtonText("Failed to join waitlist");
        setTimeout(() => {
          setButtonText("Subscribe to Join");
        }, 3000);
        break;
      case "success":
        toast.success("Added To Waitlist");
        setButtonText("Added To Waitlist");
        setTimeout(() => {
          setButtonText("Subscribe to Join");
        }, 3000);
        break;
      default:
        setButtonText("Subscribe to Join");
    }
  }, [status]);

  return (
    <form className="grid grid-cols-7 w-full max-w-md" method="POST">
      <div className="col-span-5">
        <FormGroup
          type="email"
          id="waitlistEmailInput"
          value={email}
          placeholder="Email"
          className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
          onValueChanged={(ev: any) => {
            console.log(ev);
            setEmail(ev.currentTarget.value);
          }}
          onFocusOut={(ev: any) => {
            console.log(ev);
            setEmail(ev.currentTarget.value);
          }}
        />
        <FormGroup
          type="tel"
          id="waitlistPhoneInput"
          value={phone}
          placeholder="Whatsapp number"
          className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
          onValueChanged={(ev: any) => {
            console.log(ev);
            setPhone(ev.currentTarget.value);
          }}
          onFocusOut={(ev: any) => {
            console.log(ev);
            setPhone(ev.currentTarget.value);
          }}
        />
      </div>
      <button
        className="col-span-2 bg-primary-main px-4 font-semibold flex items-center justify-center space-x-4"
        type="submit"
        onClick={(ev) => {
          ev.preventDefault();
          _handleSubmit();
        }}
      >
        <span>{buttonText}</span>
        {/* {status === "sending" && <span>Joining Waitlist...</span>}
        {status === "error" && <span>Failed to join waitlist</span>}
        {status === "success" && <span>Subscribe to Join</span>}
        {status === null && <span>Subscribe to Join</span>} */}
      </button>
    </form>
  );
};

export default JoinWaitlist;
