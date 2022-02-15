import React, { FC, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import InternationalInput from "../international-input";
import FormGroup from "../form-group";
import ListBox from "../list-box";
import { mkPostReq, validateEmail } from "../../utils/functions";
import AuthContext from "../../context/auth-context";

const PremiumRequest: FC<{ data: any; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const [premiumData, setPremiumData] = useState<any>({});
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [whatsappNumberValid, setWhatsappNumberValid] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string>("");
  const [referredFrom, setReferredFrom] = useState<string>("");

  const [dialCode, setDialCode] = useState<string>("");

  const { GLOBAL_OBJ } = useContext(AuthContext);

  async function _handlePhoneNumber(
    field: string,
    value: string,
    isValid: boolean,
    dial_code: string
  ) {
    setWhatsappNumberValid(isValid);
    setWhatsappNumber(String(value.split("+").pop()));
    console.log(dial_code);
    setDialCode(dial_code);
  }

  const _handleCoverRequest = async () => {
    if (firstname === "") {
      toast.error("Enter your first name");
      return;
    }
    if (lastname === "") {
      toast.error("Enter your last name");
      return;
    }
    if (!whatsappNumberValid) {
      toast.error("Provide a valid phone number");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (vehicleMake === "") {
      toast.error("Provide your vehicle make");
      return;
    }
    if (vehicleModel === "") {
      toast.error("Provide your vehicle model");
      return;
    }

    let premium_request_data = {
      ...data,
      email: email,
      firstName: firstname,
      lastName: lastname,
      makeOfVehicle: `${vehicleMake} - ${vehicleModel}`,
      phoneNumber: whatsappNumber.replace(dialCode, ""),
      countryInfoId: 1,
      vehicleType: "<string>",
      vehicleUse: "<string>",
      vehicleValue: "<long>",
      referredFrom,
    };

    console.log(premiumData);
    console.log(premium_request_data);

    try {
      let create_insurance_response = await mkPostReq({
        endpoint: `/api/insurances/create`,
        method: "post",
        data: JSON.stringify(premium_request_data),
        isJSON: true,
        token: GLOBAL_OBJ.token,
      });
      console.log(create_insurance_response);

      if (typeof create_insurance_response.status === "number") {
        toast.error(create_insurance_response.message);
      } else {
        onClose();
        // setShowPremiumRequestModal(false);
        // setShowPremiumRequestResponseModal(true);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-8 space-y-8">
      <h1 className="text-md font-semibold text-center">
        Please provide these details to complete your request.
      </h1>

      <div className="flex flex-row items-center md:space-x-8">
        <hr className="md:w-full" />
        <h2 className="w-full font-medium">Personal Details</h2>
        <hr className="w-full" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-row space-x-4">
          <FormGroup
            type="text"
            id="firstName"
            label="First Name"
            placeholder="First Name"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={firstname}
            onValueChanged={(_val: any) => {
              setFirstname(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setFirstname(_val.target.value);
            }}
          />

          <FormGroup
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={lastname}
            onValueChanged={(_val: any) => {
              setLastName(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              setLastName(_val.target.value);
            }}
          />
        </div>

        <InternationalInput
          firstLoad
          className={`appearance-none relative block w-full py-3 px-4 border placeholder-[#848484] bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm`}
          label={{
            classNames:
              "w-full text-swooveGray-caption p-0 mb-1 font-medium text-xs",
            text: "Whatsapp Number",
          }}
          name={"phoneNumber"}
          defaultValue={whatsappNumber}
          defaultCountry={"gh"}
          onValueChange={_handlePhoneNumber}
          disabled={false}
          autoFocus={false}
          readOnly={false}
        />

        <FormGroup
          type="email"
          id="email"
          label="Email"
          placeholder="Eg: someone@mail.com"
          className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
          value={email}
          onValueChanged={(_val: any) => {
            setEmail(_val.target.value);
          }}
          onFocusOut={(_val: any) => {
            setEmail(_val.target.value);
          }}
        />
      </div>

      <div className="flex flex-row items-center space-x-8">
        <hr className="w-full" />
      </div>

      <ListBox
        className="bg-[#101d490d] border-none"
        id="vehicle_type_of_use"
        values={[
          {
            name: "",
            value: "How did you hear about us?",
            id: "0",
          },
          {
            name: "FACEBOOK_INSTAGRAM",
            value: "Facebook/Instagram",
            id: "1",
          },
          {
            name: "GOOGLE_WEB",
            value: "Google/Web",
            id: "2",
          },
          {
            name: "LINKEDIN",
            value: "LinkedIn",
            id: "3",
          },
          {
            name: "TWITTER",
            value: "Twitter",
            id: "4",
          },
          {
            name: "Word_of_mouth",
            value: "Word of Mouth",
            id: "5",
          },
          {
            name: "FLIER",
            value: "Flier",
            id: "6",
          },
          {
            name: "BILLBOARD",
            value: "Billboard",
            id: "7",
          },
          {
            name: "NEWSPAPER_AD",
            value: "Newspaper Ad",
            id: "8",
          },
          {
            name: "RADIO",
            value: "Radio",
            id: "9",
          },
        ]}
        selected={{
          name: "",
          value: "How did you hear about us?",
          id: "0",
        }}
        onValueChange={(_type: any) => {
          // console.log(_type);
          setReferredFrom(_type.name);
        }}
      />

      <div className="flex flex-row items-center md:space-x-8">
        <hr className="md:w-full" />
        <h2 className="w-full font-medium">Vehicle Details</h2>
        <hr className="w-full" />
      </div>

      <div className="space-y-4">
        <FormGroup
          type="text"
          id="vehicleMake"
          label="Vehicle Make"
          placeholder="Eg: Mercedes"
          className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
          value={vehicleMake}
          onValueChanged={(_val: any) => {
            setVehicleMake(_val.target.value);
          }}
          onFocusOut={(_val: any) => {
            setVehicleMake(_val.target.value);
          }}
        />

        <FormGroup
          type="text"
          id="vehicleModel"
          label="Vehicle Model"
          placeholder="Eg: C350"
          className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
          value={vehicleModel}
          onValueChanged={(_val: any) => {
            setVehicleModel(_val.target.value);
          }}
          onFocusOut={(_val: any) => {
            setVehicleModel(_val.target.value);
          }}
        />
      </div>

      <button
        className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4"
        onClick={_handleCoverRequest}
      >
        <span> Proceed </span>
      </button>
    </div>
  );
};

export default PremiumRequest;
