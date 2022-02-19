import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { dataURItoBlob, mkPostReq, sentenceCase } from "../../utils/functions";
import FormGroup from "../form-group";
import InternationalInput from "../international-input";
import ListBox from "../list-box";
import DocumentPreview from "./document-preview";
import FileUpload from "./file-upload";
import SwitchButton from "./switch-button";

const VerifyPolicyDetails: FC<{ policy: any; onClose?: () => void }> = ({
  policy,
  onClose,
}) => {
  // console.log(policy);

  const sectionsList = [
    "user",
    "vehicle",
    "insurance",
    "purchase_provider",
    "main_driver",
    "previous_insurance",
    "renewal",
    "payment",
    "upload_docs",
  ];
  const [tempSection, setTempSection] = useState<string>("user");
  const [detailsSection, setDetailsSection] = useState<string>("user");

  // quote details states
  const [firstName, setFirstName] = useState<string>(
    policy?.firstName ?? "first name"
  );
  const [lastName, setLastName] = useState<string>(policy?.lastName);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dialCode, setDialCode] = useState<string>("");
  const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userOccupation, setUserOccupation] = useState<string>("");

  const vehicleTypes = [
    {
      name: "",
      value: "Type of Car",
    },
    {
      name: "SEDAN",
      value: "Sedan/Saloon",
    },
    {
      name: "COUPE",
      value: "Coupe",
    },
    {
      name: "SPORTS",
      value: "Sports Car",
    },
    {
      name: "STATION_WAGON",
      value: "Station Wagon",
      id: "4",
    },
    {
      name: "HATCHBACK",
      value: "Hatchback",
    },
    {
      name: "CONVERTIBLE",
      value: "Convertible",
    },
    {
      name: "PICKUP",
      value: "Pickup",
    },
    {
      name: "VAN",
      value: "Van",
    },
    {
      name: "MINI_BUS",
      value: "Mini/Small Bus",
    },
    {
      name: "MAXI_BUS",
      value: "Maxi/Big Bus",
    },
    {
      name: "ARTICULATED_TRUCK",
      value: "Articulated Truck",
    },
  ];
  const [vehicleType, setVehicleType] = useState<string>("");
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [registrationYear, setRegistrationYear] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string>("");
  const [numOfPassenger, setNumOfPassenger] = useState<string>("");
  const [chassisNumber, setChassisNumber] = useState<string>("");
  const [vehicleCity, setVehicleCity] = useState<string>("");
  const [vehicleCubicCap, setVehiclecubicCap] = useState<number>(0);
  const [repairState, setRepairState] = useState<string>("");
  const [vehicleColour, setVehicleColour] = useState<string>("");
  const [vehicleAlterationDetails, setVehicleAlterationDetails] =
    useState<string>("");
  const [vehicleOwner, setVehicleOwner] = useState<string>("");
  const [vehicleUse, setVehicleUse] = useState<string>("");

  const [protectionType, setProtectionType] = useState<string>("");
  const [excess, setExcess] = useState<string>("");
  const [vehicleInsuredValue, setVehicleInsuredValue] = useState<string>("");

  const [hirePurchaseProvider, setHirePurchaseProvider] = useState<string>("");

  const [vehicleMainDriver, setVehicleMainDriver] = useState<string>("");
  const [diseaseOrComplications, setDiseaseOrComplications] =
    useState<boolean>(false);

  const [declinedByOtherInsurer, setDeclinedByOthernsurer] =
    useState<string>("");
  const [previouslyIssuedClaim, setPreviouslyIssuedClaim] =
    useState<string>("");

  const [NCDRenewalNotice, setNCDRenewalNotice] = useState<File | null>(null);

  const [issueDate, setIssueDate] = useState<string>("");
  const [outrightPremium, setOutrightPremium] = useState<string>("");
  const [initialDeposit, setInitialDeposit] = useState<string>("");
  const [monthlyInstallment, setMonthlyInstallment] = useState<string>("");
  const [noOfInstallments, setNoOfInstallments] = useState<string>("");

  const [driverLicence, setDriverLicence] = useState<any>("");

  const [vehicleInsuranceId, setVehicleInsuranceId] = useState<string>("");

  const { GLOBAL_OBJ } = useContext(AuthContext);

  async function _handlePhoneNumber(
    field: string,
    value: string,
    isValid: boolean,
    dial_code: any
  ) {
    setPhoneNumberValid(isValid);
    setPhoneNumber(String(value.split("+").pop()));
    // console.log(field, value, isValid, dial_code);
    setDialCode(dial_code);
  }

  const _updateInsuranceDetails = async (final: boolean = false) => {
    // toast.info("Updating Quote Information...");
    let update_data = {
      alterationDetails: vehicleAlterationDetails,
      chassisNum: chassisNumber,
      colour: vehicleColour,
      cubicCapacity: vehicleCubicCap,
      declinedByOtherInsurer: declinedByOtherInsurer,
      diseaseOrComplications: diseaseOrComplications,
      email: email,
      excess: excess,
      firstName: firstName,
      hirePurchaseProvider: hirePurchaseProvider,
      id: policy.id,
      initialDeposit: initialDeposit,
      issueDate: issueDate,
      lastName: lastName,
      makeOfVehicle: lastName,
      monthlyInstallment: monthlyInstallment,
      noOfInstallments: noOfInstallments,
      numOfPassenger: numOfPassenger,
      occupation: userOccupation,
      outRightPremium: outrightPremium,
      phoneNumber: phoneNumber,
      previouslyIssuedClaim: previouslyIssuedClaim,
      protectionType: protectionType,
      registeredOwner: vehicleOwner,
      registrationYear: registrationYear,
      repairState,
      status: policy.status,
      userAddress,
      vehicleCity,
      vehicleInsuranceId,
      vehicleMainDriver,
      vehicleType,
      vehicleUse,
      vehicleMake,
      vehicleModel,
    };

    final && delete update_data.status;
    // console.log(final, update_data);

    try {
      let update_insurance_response = await mkPostReq({
        endpoint: `/api/insurances/${policy.id}`,
        queries: "",
        method: "put",
        token: GLOBAL_OBJ.token,
        isJSON: true,
        data: JSON.stringify(update_data),
      });
      // console.log(update_insurance_response);

      if (update_insurance_response.httpStatus) {
        toast.error(update_insurance_response.title);
      } else {
        // handle success
        setDetailsSection("");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _uploadDocs = async () => {
    // console.log("uploading licence image");
    let form_data = new FormData();
    form_data.append("file", driverLicence);

    // for (var entry of form_data.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }

    try {
      // let uploaded_docs = await mkGetReq({
      //   endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurance-documents/insurance`,
      //   token: GLOBAL_OBJ.token,
      //   queries: `insuranceId=${policy.id}`,
      // });
      // console.log(uploaded_docs);
      // let dvla_doc = uploaded_docs.filter((_doc: any) => _doc.docType === "DVLA");
      // console.log(dvla_doc);

      // // delete already existing dvla dov
      // if (dvla_doc.length > 0) {
      //   let delete_doc = await mkPostReq({
      //     endpoint: `/api/insurance-documents/${dvla_doc[0].id}`,
      //     isJSON: true,
      //     method: "delete",
      //     data: {},
      //   });
      //   console.log(delete_doc);
      // }

      let upload_licence_response = await mkPostReq({
        endpoint: `/api/user-documents/upload`,
        queries: `docType=ID_CARD&userId=${GLOBAL_OBJ.data.user_id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      // console.log(upload_licence_response);

      if (upload_licence_response.status) {
        toast.error(upload_licence_response.title);
      } else {
        // handle success
        // _updateInsuranceDetails(true);
        onClose && onClose();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (policy) {
      setFirstName(policy.firstName ?? null);
      setLastName(policy.lastName ?? null);
      setPhoneNumber(policy.phoneNumber ?? null);
      setEmail(policy.email ?? null);
      setUserAddress(policy.userAddress ?? null);
      setUserOccupation(policy.userOccupation ?? null);

      setRegistrationYear(policy.registrationYear ?? null);
      setVehicleType(policy.vehicleType ?? null);
      setVehicleUse(policy.vehicleUse ?? null);
      setVehicleMake(policy.vehicleMake ?? null);
      setVehicleModel(policy.vehicleModel ?? null);
      setNumOfPassenger(policy.numOfPassenger ?? null);
      setChassisNumber(policy.chassisNum ?? null);
      setVehicleCity(policy.vehicleCity ?? null);
      setVehiclecubicCap(policy.vehicleCubicCapacity ?? null);
      setRepairState(policy.repairState ?? null);
      setVehicleColour(policy.vehicleColour ?? null);
      setVehicleOwner(policy.vehicleOwner ?? null);
      setVehicleAlterationDetails(policy.alterationDetails ?? null);

      setProtectionType(policy.protectionType ?? null);
      setExcess(policy.excess ?? null);
      setVehicleInsuredValue(policy.vehicleInsuredValue ?? null);

      setHirePurchaseProvider(policy.hirePurchaseProvider ?? null);

      setVehicleMainDriver(policy.vehicleMainDriver ?? "");
      setDiseaseOrComplications(policy.diseaseOrComplications ?? null);

      setDeclinedByOthernsurer(policy.declinedByOtherInsurer ?? "");
      setPreviouslyIssuedClaim(policy.previouslyIssuedClaim ?? "");

      setIssueDate(policy.startDate);
      setOutrightPremium(policy.outRightPremium);
      setInitialDeposit(policy.initialDeposit);
      setMonthlyInstallment(policy.monthlyInstallment);
      setNoOfInstallments(policy.noOfInstallments);

      setVehicleInsuranceId(policy.vehicleInsuranceId ?? "");
    }

    return () => {
      mounted = false;
    };
  }, [policy]);

  const hiddenRef = useRef(null);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full">
          {/* <ProgressSteps // TODO work on this later
                steps={[
                { name: "step 1", is_complete: true },
                { name: "step 2", is_complete: true },
                { name: "step 3", is_complete: false },
                { name: "step 4", is_complete: false },
                ]}
                progress={1}
            /> */}
        </div>
        <form
          action="#"
          method="post"
          className="w-full flex flex-col space-y-8"
        >
          <Transition
            as={"div"}
            show={detailsSection === "user"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="firstName"
                label="First Name"
                placeholder="Eg: Jay"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={firstName}
                onValueChanged={(_val: any) => {
                  setFirstName(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setFirstName(_val.target.value);
                }}
                editable={true}
                isRequired
              />

              <FormGroup
                type="text"
                id="lastName"
                label="Last Name"
                placeholder="Eg: Ford"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={lastName}
                onValueChanged={(_val: any) => {
                  setLastName(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setLastName(_val.target.value);
                }}
                editable={true}
              />
            </div>

            <div className="w-full">
              <InternationalInput
                firstLoad
                className={`appearance-none relative block w-full py-3 px-4 placeholder-[#848484] border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm`}
                label={{
                  classNames:
                    "w-full text-swooveGray-caption p-0 mb-1 font-medium text-xs",
                  text: "Phone Number",
                }}
                name={"phoneNumber"}
                defaultValue={phoneNumber}
                defaultCountry={"gh"}
                onValueChange={_handlePhoneNumber}
                disabled={false}
                autoFocus={false}
                readOnly={policy.status === "QUOTE_CONFIRMED"}
              />
            </div>

            <div className="w-full">
              <FormGroup
                type="text"
                id="email"
                label="Email"
                placeholder="Eg: someone@domain.com"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={email}
                onValueChanged={(_val: any) => {
                  setEmail(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setEmail(_val.target.value);
                }}
                editable={true}
              />
            </div>

            <div className="w-full">
              <FormGroup
                type="text"
                id="userAddress"
                label="Address"
                placeholder="Eg: Mercedes"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={userAddress}
                onValueChanged={(_val: any) => {
                  setUserAddress(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setUserAddress(_val.target.value);
                }}
                editable={true}
              />
            </div>

            <div className="w-full">
              <FormGroup
                type="text"
                id="occupation"
                label="Occupation"
                placeholder="Eg: Teacher"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={userOccupation}
                onValueChanged={(_val: any) => {
                  setUserOccupation(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setUserOccupation(_val.target.value);
                }}
                editable={true}
              />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "vehicle"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-row space-x-4">
              <ListBox
                className="bg-[#101d490d] border-none"
                label="Vehicle Type"
                id="type_of_car"
                values={[
                  {
                    name: "",
                    value: "Vehicle Type",
                    id: "0",
                  },
                  {
                    name: "SEDAN",
                    value: "Saloon/Sedan",
                    id: "1",
                  },
                  {
                    name: "COUPE",
                    value: "Coupe",
                    id: "2",
                  },
                  {
                    name: "SPORTS",
                    value: "Sports Car",
                    id: "3",
                  },
                  {
                    name: "STATION_WAGON",
                    value: "Station Wagon",
                    id: "4",
                  },
                  {
                    name: "HATCHBACK",
                    value: "Hatchback",
                    id: "5",
                  },
                  {
                    name: "CONVERTIBLE",
                    value: "Convertible",
                    id: "6",
                  },
                  {
                    name: "PICKUP",
                    value: "Pickup",
                    id: "7",
                  },
                  {
                    name: "VAN",
                    value: "Van",
                    id: "8",
                  },
                  {
                    name: "MINI_BUS",
                    value: "Mini/Small Bus",
                    id: "9",
                  },
                  {
                    name: "MAXI_BUS",
                    value: "Maxi/Big Bus",
                    id: "10",
                  },
                  {
                    name: "ARTICULATED_TRUCK",
                    value: "Articulated Truck",
                    id: "0",
                  },
                ]}
                selected={{
                  name: "",
                  value: "Vehicle type",
                  id: "0",
                }}
                onValueChange={(_type: any) => {
                  // console.log(_type);
                  setVehicleType(_type.value);
                }}
              />

              <ListBox
                className="bg-[#101d490d] border-none"
                id="vehicle_type_of_use"
                label="Vehicle Use"
                values={[
                  {
                    name: "",
                    value: "Type of use",
                    id: "0",
                  },
                  {
                    name: "PRIVATE_USE_OWN_VEHICLE",
                    value: "Private Use (Individul Owned)",
                    id: "1",
                  },
                  {
                    name: "PRIVATE_USE_COMPANY_OWNED",
                    value: "Private Use (Company Owned)",
                    id: "2",
                  },
                  {
                    name: "UBER_BOLT_TANGO_ETC",
                    value: "Uber/Bolt/Yango/Etc",
                    id: "3",
                  },
                  {
                    name: "TAXI",
                    value: "Taxi",
                    id: "4",
                  },
                  {
                    name: "HIRING_CAR",
                    value: "Hiring Car",
                    id: "5",
                  },
                  {
                    name: "BUS",
                    value: "Omni Bus",
                    id: "6",
                  },
                  {
                    name: "OWN_GOODS_CARRYING_VEHICLE",
                    value: "Own Goods Carrying Vehicle",
                    id: "7",
                  },
                  {
                    name: "GENERAL_CARTAGE_ABOVE_3000",
                    value: "General Cartage (Above 3000kg)",
                    id: "8",
                  },
                  {
                    name: "GENERAL_CARTAGE_BELOW_3000",
                    value: "General Cartage (Below 3000kg)",
                    id: "9",
                  },
                  {
                    name: "ARTICULATOR_HEAD",
                    value: "Articulated Truck Head",
                    id: "9",
                  },
                  {
                    name: "SPECIAL_TYPE_SITE",
                    value: "Special Type (Site use only)",
                    id: "9",
                  },
                  {
                    name: "SPECIAL_TYPE_SITE_ROAD",
                    value: "Special Type (Site and Road use)",
                    id: "9",
                  },
                  {
                    name: "TRADE_PLATE",
                    value: "Trade Plate (Personal Use only)",
                    id: "9",
                  },
                ]}
                selected={{
                  name: "",
                  value: "Type of use",
                  id: "0",
                }}
                onValueChange={(_type: any) => {
                  // console.log(_type);
                  setVehicleUse(_type.value);
                }}
              />
            </div>
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="vehicleMake"
                label="Vehicle Make"
                placeholder="Eg: Mercedes"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleMake}
                onValueChanged={(_val: any) => {
                  setVehicleMake(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleMake(_val.target.value);
                }}
                editable={true}
              />

              <FormGroup
                type="text"
                id="vehicleModel"
                label="Vehicle Model"
                placeholder="Eg: C350"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleModel}
                onValueChanged={(_val: any) => {
                  setVehicleModel(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleModel(_val.target.value);
                }}
                editable={true}
              />
            </div>
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="vehicleCubicCap"
                label="Vehicle Cubic Capacity"
                placeholder="Eg: C350"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleCubicCap}
                onValueChanged={(_val: any) => {
                  setVehiclecubicCap(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehiclecubicCap(_val.target.value);
                }}
                editable={true}
              />

              <FormGroup
                type="text"
                id="vehicleColour"
                label="Vehicle Colour"
                placeholder="Eg: Red"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleColour}
                onValueChanged={(_val: any) => {
                  setVehicleColour(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleColour(_val.target.value);
                }}
                editable={true}
              />
            </div>
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="passengerCount"
                label="No. of Passengers"
                placeholder="Eg: 5"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={numOfPassenger}
                onValueChanged={(_val: any) => {
                  setNumOfPassenger(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setNumOfPassenger(_val.target.value);
                }}
                disabled
              />

              <FormGroup
                type="text"
                id="vehicleRepairState"
                label="Vehicle Repair State"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={repairState}
                onValueChanged={(_val: any) => {
                  setRepairState(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setRepairState(_val.target.value);
                }}
                editable={true}
              />
            </div>
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="vehicleAlterationDets"
                label="Vehicle Alteration Details"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleAlterationDetails}
                onValueChanged={(_val: any) => {
                  setVehicleAlterationDetails(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleAlterationDetails(_val.target.value);
                }}
                editable={true}
              />

              <FormGroup
                type="text"
                id="chassisNumber"
                label="Chassis Number"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={chassisNumber}
                onValueChanged={(_val: any) => {
                  setChassisNumber(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setChassisNumber(_val.target.value);
                }}
                editable={true}
              />
            </div>

            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="registeredOwner"
                label="Vehicle Owner"
                placeholder="Eg: C350"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleOwner}
                onValueChanged={(_val: any) => {
                  setVehicleOwner(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleOwner(_val.target.value);
                }}
                editable={true}
              />

              <FormGroup
                type="text"
                id="vehicleCity"
                label="Vehicle City"
                placeholder="Eg: Accra"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleCity}
                onValueChanged={(_val: any) => {
                  setVehicleCity(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleCity(_val.target.value);
                }}
                editable={true}
              />
            </div>
            <div className="w-full flex flex-row space-x-4">
              <ListBox
                className="bg-[#101d490d] border-none"
                label="Year of Registration"
                id="year_of_registration"
                values={[
                  {
                    name: "",
                    value: "Year of Registration",
                    id: "0",
                  },
                  {
                    name: "Y2022",
                    value: "2022",
                    id: "1",
                  },
                  {
                    name: "Y2021",
                    value: "2021",
                    id: "1",
                  },
                  {
                    name: "Y2020",
                    value: "2020",
                    id: "1",
                  },
                  {
                    name: "Y2019",
                    value: "2019",
                    id: "1",
                  },
                  {
                    name: "Y2018",
                    value: "2018",
                    id: "1",
                  },
                  {
                    name: "Y2017",
                    value: "2017",
                    id: "1",
                  },
                  {
                    name: "BEFORE_2017",
                    value: "Before 2017",
                    id: "1",
                  },
                ]}
                selected={{
                  name: "",
                  value: "Year of Registration",
                  id: "0",
                }}
                onValueChange={(_YoR: any) => {
                  // console.log(_YoR);
                  setRegistrationYear(_YoR.name);
                }}
              />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "insurance"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="protectionType"
                label="Protection Type"
                placeholder="Eg: Mercedes"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={protectionType}
                onValueChanged={(_val: any) => {
                  setProtectionType(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setProtectionType(_val.target.value);
                }}
                editable={true}
              />

              <FormGroup
                type="text"
                id="excess"
                label="Excess"
                placeholder="Eg: C350"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={excess}
                onValueChanged={(_val: any) => {
                  setExcess(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setExcess(_val.target.value);
                }}
                editable={true}
              />
            </div>
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="vehicleInsuranceValue"
                label="Vehicle Insurance Value"
                placeholder="Eg: Mercedes"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleInsuredValue}
                onValueChanged={(_val: any) => {
                  setVehicleInsuredValue(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleInsuredValue(_val.target.value);
                }}
                editable={true}
              />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "purchase_provider"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="hirePurchaseProvider"
                label="hire Purchase Provider"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={hirePurchaseProvider}
                onValueChanged={(_val: any) => {
                  setHirePurchaseProvider(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setHirePurchaseProvider(_val.target.value);
                }}
                editable={true}
              />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "main_driver"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="vehicleMainDriver"
                label="Vehicle Main Driver"
                placeholder="Eg: Samuel Ofori"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={vehicleMainDriver}
                onValueChanged={(_val: any) => {
                  setVehicleMainDriver(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleMainDriver(_val.target.value);
                }}
                editable={true}
              />
            </div>
            <div className="box-border pt-5 flex justify-between cursor-pointer">
              <p
                onClick={() => {
                  setDiseaseOrComplications(!diseaseOrComplications);
                }}
              >
                Driver has any disease or complications
              </p>
              <SwitchButton
                state={diseaseOrComplications}
                onSwitch={() => {
                  // console.log(diseaseOrComplications);
                  setDiseaseOrComplications(!diseaseOrComplications);
                }}
              />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "previous_insurance"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-col">
              <label
                htmlFor="declinedByOtherInsurance"
                className="w-full text-gray-900 p-0 mb-1 font-medium text-xs"
              >
                Declined By Other Insurance?
              </label>
              <textarea
                name="delicnedByOtherInsurance"
                id="declinedByotherInsurance"
                rows={5}
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3 resize-none"
                value={declinedByOtherInsurer}
                onChange={(_val) => {
                  setDeclinedByOthernsurer(_val.target.value);
                }}
              ></textarea>
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor="declinedByOtherInsurance"
                className="w-full text-gray-900 p-0 mb-1 font-medium text-xs"
              >
                Previously Issued Claim
              </label>
              <textarea
                name="delicnedByOtherInsurance"
                id="declinedByotherInsurance"
                rows={5}
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3 resize-none"
                value={previouslyIssuedClaim}
                onChange={(_val) => {
                  setPreviouslyIssuedClaim(_val.target.value);
                }}
              ></textarea>
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "renewal"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <p className="text-center font-semibold mb-8">Renewal Notice</p>
            <div className="flex flex-row">
              <DocumentPreview documents={null} />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "payment"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="startDate"
                label="Premium Start Date"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={moment(issueDate).format("DD MMM YYYY")}
                onValueChanged={() => {}}
                onFocusOut={() => {}}
                disabled
              />

              <FormGroup
                type="text"
                id="outRightPremium"
                label="Out Right Premium"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={outrightPremium}
                onValueChanged={() => {}}
                onFocusOut={() => {}}
                disabled
              />
            </div>

            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="initialDeposit"
                label="Initial Deposit"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={initialDeposit}
                onValueChanged={() => {}}
                onFocusOut={() => {}}
                disabled
              />

              <FormGroup
                type="text"
                id="monthlyInstallment"
                label="Monthly Installment"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={monthlyInstallment}
                onValueChanged={() => {}}
                onFocusOut={() => {}}
                disabled
              />
            </div>

            <div className="w-full flex flex-row space-x-4">
              <FormGroup
                type="text"
                id="noOfInstallments"
                label="No. Of Installments"
                placeholder=""
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border px-3"
                value={sentenceCase(noOfInstallments.replace("_", " "))}
                onValueChanged={() => {}}
                onFocusOut={() => {}}
                disabled
              />
            </div>
          </Transition>

          <Transition
            as={"div"}
            show={detailsSection === "upload_docs"}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => {
              setDetailsSection(tempSection);
            }}
            className={"max-w-md w-full space-y-2"}
          >
            <div className="w-full flex flex-col space-y-4">
              <FileUpload
                multiple={false}
                allowSelect={true}
                onFileLoad={(image: any) => {
                  // console.log(image);

                  //// console.log(productImages)
                  var block = image[0].file?.split(";");

                  // Get the content type of the image
                  var contentType = block[0].split(":")[1]; // In this case "image/gif"

                  // get the real base64 content of the file
                  var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

                  // Convert it to a blob to upload
                  var blobImage = dataURItoBlob(realData);
                  // console.log(blobImage);

                  setDriverLicence(blobImage);
                }}
              />
            </div>
          </Transition>

          <div className="w-full flex flex-row justify-between">
            <button
              className={`border border-gray-200 rounded-md px-4 py-2 w-max flex flex-row items-center space-x-2 ${
                detailsSection === "user"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={detailsSection === "user"}
              onClick={(ev) => {
                ev.preventDefault();
                // console.log(
                //   sectionsList[sectionsList.indexOf(detailsSection) - 1]
                // );
                setTempSection(
                  sectionsList[sectionsList.indexOf(detailsSection) - 1]
                );
                setDetailsSection("");
              }}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              className={`bg-primary-main rounded-md px-4 py-2 w-max flex flex-row items-center space-x-2 cursor-pointer`}
              onClick={async (ev) => {
                ev.preventDefault();

                if (detailsSection === "upload_docs") {
                  _uploadDocs();
                  return;
                }

                _updateInsuranceDetails();
                // console.log(
                //   sectionsList[sectionsList.indexOf(detailsSection) + 1]
                // );
                setTempSection(
                  sectionsList[sectionsList.indexOf(detailsSection) + 1]
                );
                setDetailsSection("");
              }}
            >
              <span>
                {detailsSection === "upload_docs" ? "Proceed" : "Next"}
              </span>
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyPolicyDetails;
