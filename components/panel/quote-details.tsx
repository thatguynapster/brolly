import {
  ChevronLeftIcon,
  PhotographIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import {
  dataURItoBlob,
  mkGetReq,
  mkPostReq,
  noOfInstallmentIntValue,
  sentenceCase,
} from "../../utils/functions";
import FormGroup from "../form-group";
import PolicyDocumentsPreview from "./policy-documents-preview";
import DocumentView from "./document-view";
import FileUpload from "./file-upload";
import SwitchButton from "./switch-button";
import DocumentPreview from "./document-preview";

const QuoteDetails: FC<{
  policy: any;
  onProceed: () => void;
  onReturn?: () => void;
}> = ({ policy, onProceed, onReturn }) => {
  // console.log(policy);
  const { GLOBAL_OBJ } = useContext(AuthContext);

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
  const [occupation, setOccupation] = useState<string>("");

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
  const [chassisNum, setChassisNum] = useState<string>("");
  const [vehicleCity, setVehicleCity] = useState<string>("");
  const [cubicCapacity, setCubicCapacity] = useState<number>(0);
  const [repairState, setRepairState] = useState<string>("");
  const [colour, setColour] = useState<string>("");
  const [alterationDetails, setAlterationDetails] = useState<string>("");
  const [registeredOwner, setRegisteredOwner] = useState<string>("");
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

  const [previewDoc, setPreviewDoc] = useState<{
    doc: string;
    type: "image" | "document";
  } | null>(null);

  const [NCDRenewalNotice, setNCDRenewalNotice] = useState<File | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [outRightPremium, setOutrightPremium] = useState<string>("");
  const [initialDeposit, setInitialDeposit] = useState<string>("");
  const [monthlyInstallment, setMonthlyInstallment] = useState<string>("");
  const [noOfInstallments, setNoOfInstallments] = useState<string>("");

  const [renewalNotice, setRenewalNotice] = useState<any | null>(null);
  const [driverLicence, setDriverLicence] = useState<any>(null);

  const [allDataValid, setAllDataValid] = useState<boolean>(false);

  const [vehicleInsuranceId, setVehicleinsuranceId] = useState<string>("");

  const _getPolicyDocuments = async () => {
    try {
      let policy_docs_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/insurance-documents/insurance`,
        token: GLOBAL_OBJ.token,
        queries: `insuranceId=${policy.id}`,
      });
      console.log(policy_docs_response);

      // set renewal notice
      let renewal_notice = policy_docs_response.filter(
        (_doc: any) => _doc.docType === "POLICY_RENEWAL_NOTICE"
      );

      if (renewal_notice.length > 0) {
        renewal_notice.length > 0 &&
          setRenewalNotice({
            name: renewal_notice[renewal_notice.length - 1].docURL,
            id: renewal_notice[renewal_notice.length - 1].id,
          });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _uploadRenewalNotice = async (file?: any) => {
    // toast.info("Uploading staff ID");
    let form_data = new FormData();
    form_data.append("file", file ?? renewalNotice);

    try {
      let upload_insurance_doc_response = await mkPostReq({
        endpoint: `/api/insurance-documents/upload`,
        queries: `docType=POLICY_RENEWAL_NOTICE&insuranceId=${policy.id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      console.log(upload_insurance_doc_response);

      if (upload_insurance_doc_response.status) {
        toast.error(upload_insurance_doc_response.title);
      } else {
        // handle success
        setRenewalNotice({
          name: upload_insurance_doc_response.docURL,
          id: upload_insurance_doc_response.id,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _getUserDocuments = async () => {
    try {
      let policy_docs_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/user-documents/user`,
        token: GLOBAL_OBJ.token,
        queries: `userId=${GLOBAL_OBJ.data.user_id}`,
      });
      console.log(policy_docs_response);

      // set driver licence
      let dl = policy_docs_response.filter(
        (_doc: any) => _doc.docType === "ID_CARD"
      );

      if (dl.length > 0) {
        console.log("driver licence found");
        console.log(dl[dl.length - 1].docURL);
        setDriverLicence({
          name: dl[dl.length - 1].docURL,
          id: dl[dl.length - 1].id,
        });
      } else {
        // console.log("no driver licence found");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _uploadDocs = async (file?: any) => {
    // toast.info("Uploading licence image");
    console.log(file);
    let form_data = new FormData();
    form_data.append("file", file);

    try {
      let upload_licence_response = await mkPostReq({
        endpoint: `/api/user-documents/upload`,
        queries: `docType=ID_CARD&userId=${GLOBAL_OBJ.data.user_id}`,
        method: "post",
        token: GLOBAL_OBJ.token,
        isJSON: false,
        data: form_data,
      });
      console.log(upload_licence_response);

      if (upload_licence_response.status) {
        toast.error(upload_licence_response.title);
      } else {
        // handle success
        setDriverLicence({
          name: upload_licence_response.docURL,
          id: upload_licence_response.id,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const _deleteRenewalNotice = async () => {
    try {
      let delete_doc = await mkPostReq({
        endpoint: `/api/insurance-documents/${renewalNotice.id}`,
        isJSON: true,
        method: "delete",
        token: GLOBAL_OBJ.token,
        data: {},
      });
      // console.log(delete_doc);
      toast.success("Renewal notice deleted.");
    } catch (error) {
      // console.log(error);
    }
  };

  const _deleteDriverLicence = async (file: any) => {
    try {
      await mkPostReq({
        endpoint: `/api/user-documents/${file.id}`,
        isJSON: true,
        method: "delete",
        token: GLOBAL_OBJ.token,
        data: {},
      }).then(() => {
        setDriverLicence(null);
      });
      // console.log(delete_doc);
      toast.success("Driver licence deleted.");
    } catch (error) {
      // console.log(error);
    }
    console.log(driverLicence);
  };

  const _updateInsuranceDetails = async (final: boolean = false) => {
    // toast.info("Updating Quote Information...");
    let update_data = {
      ...policy,
      alterationDetails,
      chassisNum,
      colour,
      countryInfoId: policy.countryInfoId,
      cubicCapacity,
      declinedByOtherInsurer,
      diseaseOrComplications,
      email,
      excess,
      firstName,
      hirePurchaseProvider,
      id: policy.id,
      initialDeposit,
      issueDate: startDate,
      lastName,
      makeOfVehicle: vehicleMake,
      monthlyInstallment,
      noOfInstallments,
      numOfPassenger,
      occupation,
      outRightPremium,
      phoneNumber,
      previouslyIssuedClaim,
      protectionType,
      registeredOwner,
      registrationYear,
      repairState,
      status:
        policy.protectionType === "THIRD_PARTY" ||
        policy.protectionType === "THIRD_PARTY_FIRE_THEFT"
          ? "AGREEMENT_SIGNED"
          : "DETAILS_VERIFIED",
      userAddress,
      userId: GLOBAL_OBJ.data.user_id,
      vehicleCity,
      vehicleMainDriver,
      vehicleType,
      vehicleInsuranceId,
      vehicleUse,
      vehicleMake,
      vehicleModel,
    };
    console.log(update_data);

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
        toast.success("Quote Information Updated");
        setTimeout(() => {
          onProceed();
        }, 2500);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && policy) {
      setFirstName(policy.firstName ?? "");
      setLastName(policy.lastName ?? "");
      setPhoneNumber(policy.phoneNumber ?? "");
      setDialCode(policy.dialCode ?? "");
      setEmail(policy.email ?? "");
      setUserAddress(policy.userAddress ?? "");
      setOccupation(policy.occupation ?? "");

      setVehicleType(policy.vehicleType ?? "");
      setVehicleMake(policy.makeOfVehicle ?? "");
      setRegistrationYear(policy.registrationYear ?? "");
      setVehicleModel(policy.vehicleModel ?? "");
      setNumOfPassenger(policy.numOfPassenger ?? "");
      setChassisNum(policy.chassisNum ?? "");
      setVehicleCity(policy.vehicleCity ?? "");
      setCubicCapacity(policy.cubicCapacity ?? "");
      setRepairState(policy.repairState ?? "");
      setColour(policy.colour ?? "");
      setAlterationDetails(policy.alterationDetails ?? "");
      setRegisteredOwner(policy.registeredOwner ?? "");
      setVehicleUse(policy.vehicleUse ?? "");

      if (policy?.protectionType === "COMPREHENSIVE_100") {
        setProtectionType("100% Comprehensive");
        return;
      }
      if (policy?.protectionType === "COMPREHENSIVE") {
        setProtectionType("90% Comprehensive");
        return;
      }
      setProtectionType(
        sentenceCase(policy?.protectionType.replaceAll("_", " ") ?? "")
      );

      setExcess(policy.excess ?? "");
      setVehicleInsuredValue(policy.vehicleInsuredValue ?? "");

      setHirePurchaseProvider(policy.hirePurchaseProvider ?? null);

      setVehicleMainDriver(policy.vehicleMainDriver ?? "");
      setDiseaseOrComplications(policy.diseaseOrComplications ?? null);

      setDeclinedByOthernsurer(policy.declinedByOtherInsurer ?? "");
      setPreviouslyIssuedClaim(policy.previouslyIssuedClaim ?? "");

      setStartDate(policy.startDate);
      setOutrightPremium(policy.outRightPremium);
      setInitialDeposit(policy.initialDeposit);
      setMonthlyInstallment(policy.monthlyInstallment);
      setNoOfInstallments(policy.noOfInstallments);

      setVehicleinsuranceId(policy.vehicleInsuranceId ?? "");

      _getPolicyDocuments();
    }

    return () => {
      mounted = false;
    };
  }, [policy]);

  useEffect(() => {
    let mounted = true;
    console.log(policy);
    mounted && _getUserDocuments();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <button
        className="px-3 py-1 text-gray-700 border border-primary-border flex flex-row items-center justify-center space-x-8 hover:bg-primary-main hover:text-dark rounded-md"
        onClick={onReturn}
      >
        <ChevronLeftIcon className="w-4 h-4" /> Back
      </button>
      {/* {policy ? ( */}
      <div className="py-4 flex flex-col items justify-center space-y-8">
        <div className="flex flex-row space-x-4 items-center">
          <hr className="w-full text-gray-700 bg-gray-700" />
          <h1 className="w-max whitespace-nowrap text-center font-bold text-lg capitalize">
            quote details
          </h1>
          <hr className="w-full text-gray-700 bg-gray-700" />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              about you
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormGroup
              type="text"
              id="firstName"
              label="First Name"
              placeholder="Eg: Jay"
              className="w-full rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
              value={firstName ?? ""}
              onValueChanged={(_val: any) => {
                setFirstName(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setFirstName(_val.target.value);
              }}
              isRequired
            />

            <FormGroup
              type="text"
              id="lastName"
              label="Last Name"
              placeholder="Eg: Ford"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
              value={lastName ?? ""}
              onValueChanged={(_val: any) => {
                setLastName(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setLastName(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="lastName"
              label="Phone Number"
              placeholder="Eg: 0231234567"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
              value={phoneNumber ?? ""}
              onValueChanged={() => {}}
              onFocusOut={() => {}}
              disabled
            />

            <FormGroup
              type="text"
              id="email"
              label="Email"
              placeholder="Eg: someone@domain.com"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
              value={email ?? ""}
              onValueChanged={(_val: any) => {
                setEmail(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setEmail(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="userAddress"
              label="Address"
              placeholder="Eg: No. 12 Kpong Street, Achimota"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
              value={userAddress ?? ""}
              onValueChanged={(_val: any) => {
                setUserAddress(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setUserAddress(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="occupation"
              label="Occupation"
              placeholder="Eg: Teacher"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
              value={occupation ?? ""}
              onValueChanged={(_val: any) => {
                setOccupation(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setOccupation(_val.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              about your vehicle
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormGroup
              type="text"
              id="vehicleType"
              label="Vehicle Type"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={sentenceCase(vehicleType ?? "")}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              editable={false}
              disabled={true}
            />

            <FormGroup
              type="text"
              id="vehicleMake"
              label="Vehicle Make"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={sentenceCase(policy?.makeOfVehicle ?? "")}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              editable={false}
              disabled={true}
            />

            <FormGroup
              type="text"
              id="vehicleModel"
              label="Vehicle Model"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={sentenceCase(policy?.vehicleModel ?? "")}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              editable={false}
              disabled={true}
            />

            <FormGroup
              type="text"
              id="vehicleCubicCap"
              label="Vehicle Cubic Capacity"
              // placeholder="Eg: C350"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={cubicCapacity ?? ""}
              onValueChanged={(_val: any) => {
                setCubicCapacity(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setCubicCapacity(_val.target.value);
              }}
              //
              disabled={true}
            />

            <FormGroup
              type="text"
              id="vehicleColour"
              label="Vehicle Colour"
              placeholder="Eg: Red"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={colour ?? ""}
              onValueChanged={(_val: any) => {
                setColour(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setColour(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="vehicleCity"
              label="Vehicle Use"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={sentenceCase(vehicleUse.replaceAll("_", " ") ?? "")}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              editable={false}
              disabled={true}
            />

            <FormGroup
              type="text"
              id="passengerCount"
              label="No. of Passengers"
              placeholder="Eg: 5"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={numOfPassenger ?? ""}
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
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={repairState ?? ""}
              onValueChanged={(_val: any) => {
                setRepairState(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setRepairState(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="vehicleAlterationDets"
              label="Vehicle Alteration Details"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={alterationDetails ?? ""}
              onValueChanged={(_val: any) => {
                setAlterationDetails(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setAlterationDetails(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="chassisNumber"
              label="Chassis Number"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={chassisNum ?? ""}
              onValueChanged={(_val: any) => {
                setChassisNum(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setChassisNum(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="passengerCount"
              label="Registration Year"
              placeholder="Eg: 5"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={registrationYear.substring(1) ?? ""}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              disabled
            />

            <FormGroup
              type="text"
              id="vehicleCity"
              label="Vehicle City"
              placeholder="Eg: Accra"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={vehicleCity ?? ""}
              onValueChanged={(_val: any) => {
                setVehicleCity(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setVehicleCity(_val.target.value);
              }}
            />

            <FormGroup
              type="text"
              id="registeredOwner"
              label="Vehicle Owner"
              placeholder="Eg: Samuel ofori"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={registeredOwner ?? ""}
              onValueChanged={(_val: any) => {
                setRegisteredOwner(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setRegisteredOwner(_val.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              about your insurance
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <FormGroup
              type="text"
              id="protectionType"
              label="Protection Type"
              placeholder="Eg: Mercedes"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={protectionType}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              disabled
            />

            <FormGroup
              type="text"
              id="excess"
              label="Excess"
              placeholder="Eg: C350"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={excess ?? ""}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              disabled
            />

            <FormGroup
              type="text"
              id="vehicleInsuranceValue"
              label="Vehicle Insurance Value"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={vehicleInsuredValue ?? ""}
              onValueChanged={(_val: any) => {}}
              onFocusOut={(_val: any) => {}}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              hire purchase provider
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <FormGroup
              type="text"
              id="hirePurchaseProvider"
              label="Hire Purchase Provider"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={hirePurchaseProvider ?? ""}
              onValueChanged={(_val: any) => {
                setHirePurchaseProvider(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setHirePurchaseProvider(_val.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              about the main driver
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <FormGroup
              type="text"
              id="vehicleMainDriver"
              label="Vehicle Main Driver"
              placeholder="Eg: Samuel Ofori"
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={vehicleMainDriver ?? ""}
              onValueChanged={(_val: any) => {
                setVehicleMainDriver(_val.target.value);
              }}
              onFocusOut={(_val: any) => {
                setVehicleMainDriver(_val.target.value);
              }}
            />

            <div className="col-span-2 cursor-pointer">
              <p
                onClick={() => {
                  setDiseaseOrComplications(!diseaseOrComplications);
                }}
              >
                Does driver have any disease or complications
              </p>
              <SwitchButton
                state={diseaseOrComplications}
                onSwitch={() => {
                  // console.log(diseaseOrComplications);
                  setDiseaseOrComplications(!diseaseOrComplications);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              Information
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full flex flex-col col-span-2">
              <label
                htmlFor="declinedByOtherInsurance"
                className="w-full text-gray-900 p-0 mb-1 font-medium text-xs"
              >
                Declined By Other Insurance?
              </label>
              <textarea
                name="delicnedByOtherInsurance"
                id="declinedByotherInsurance"
                rows={7}
                className="border border-gray-200 bg-transparent rounded-[0px] placeholder-[#848484] focus:ring-0 px-4 py-3 focus:outline-none resize-none"
                value={declinedByOtherInsurer}
                onChange={(_val) => {
                  setDeclinedByOthernsurer(_val.target.value);
                }}
              ></textarea>
            </div>

            <div className="w-full flex flex-col col-span-2">
              <label
                htmlFor="declinedByOtherInsurance"
                className="w-full text-gray-900 p-0 mb-1 font-medium text-xs"
              >
                Previously Issued Claim
              </label>
              <textarea
                name="delicnedByOtherInsurance"
                id="declinedByotherInsurance"
                rows={7}
                className="border border-gray-200 bg-transparent rounded-[0px] placeholder-[#848484] focus:ring-0 px-4 py-3 focus:outline-none resize-none"
                value={previouslyIssuedClaim}
                onChange={(_val) => {
                  setPreviouslyIssuedClaim(_val.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              renewal notice
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-row">
              {renewalNotice ? (
                <DocumentPreview
                  document={renewalNotice.name}
                  onView={(_doc, _type) => {
                    console.log(_doc, _type);
                    setPreviewDoc({
                      doc: `${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${_doc}`,
                      type: _type,
                    });
                  }}
                  onDelete={() => {
                    _deleteRenewalNotice();
                    setRenewalNotice(null);
                  }}
                />
              ) : (
                <FileUpload
                  allowSelect={!renewalNotice}
                  multiple={false}
                  defaultImage={renewalNotice}
                  onFileLoad={(image: any) => {
                    console.log(image);

                    if (image) {
                      //console.log(productImages)
                      var block = image[0].file?.split(";");

                      // Get the content type of the image
                      var contentType = block[0].split(":")[1]; // In this case "image/gif"

                      // get the real base64 content of the file
                      var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

                      // Convert it to a blob to upload
                      var blobImage = dataURItoBlob(realData);

                      console.log(blobImage);

                      let file = new File([blobImage], image[0].name, {
                        type: contentType,
                      });
                      console.log(file);

                      setRenewalNotice(file);
                      _uploadRenewalNotice(file);
                      return;
                    }
                    setRenewalNotice(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              payment &amp; commencement
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <FormGroup
              type="text"
              id="startDate"
              label="Premium Start Date"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={moment(startDate).format("DD MMM YYYY")}
              onValueChanged={() => {}}
              onFocusOut={() => {}}
              disabled
            />

            <FormGroup
              type="text"
              id="outRightPremium"
              label="Out Right Premium"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={policy?.outRightPremium.toFixed(2) ?? ""}
              onValueChanged={() => {}}
              onFocusOut={() => {}}
              disabled
            />

            <FormGroup
              type="text"
              id="initialDeposit"
              label="Initial Deposit"
              placeholder=""
              className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
              value={policy?.initialDeposit.toFixed(2) ?? ""}
              onValueChanged={() => {}}
              onFocusOut={() => {}}
              disabled
            />
            {noOfInstallments !== "FULL_PAYMENT" && (
              <>
                <FormGroup
                  type="text"
                  id="monthlyInstallment"
                  label="Monthly Installment"
                  placeholder=""
                  className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
                  value={policy?.monthlyInstallment.toFixed(2) ?? ""}
                  onValueChanged={() => {}}
                  onFocusOut={() => {}}
                  disabled
                />

                <FormGroup
                  type="text"
                  id="noOfInstallments"
                  label="Installment Period"
                  placeholder=""
                  className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border px-3"
                  value={`${noOfInstallmentIntValue(
                    policy?.noOfInstallments.split("_")[0]
                  )} ${sentenceCase(
                    policy?.noOfInstallments.split("_")[1] ?? ""
                  )}`}
                  onValueChanged={() => {}}
                  onFocusOut={() => {}}
                  disabled
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-8 items-center">
            <h1 className="w-max whitespace-nowrap text-center font-bold text-md capitalize">
              vehicle owner&apos;s id
            </h1>
            <hr className="w-full text-gray-700 bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-row">
              {driverLicence ? (
                <DocumentPreview
                  document={driverLicence.name}
                  onView={(_doc, _type) => {
                    console.log(_doc, _type);
                    setPreviewDoc({
                      doc: `${process.env.NEXT_PUBLIC_USER_DOCS_STORAGE_LINK}${_doc}`,
                      type: _type,
                    });
                  }}
                  onDelete={() => {
                    _deleteDriverLicence(driverLicence);
                  }}
                />
              ) : (
                <FileUpload
                  multiple={false}
                  allowSelect={!driverLicence}
                  onFileLoad={(image: any) => {
                    console.log(image);

                    if (image) {
                      //// console.log(productImages)
                      var block = image[0].file?.split(";");

                      // Get the content type of the image
                      var contentType = block[0].split(":")[1]; // In this case "image/gif"

                      // get the real base64 content of the file
                      var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

                      // Convert it to a blob to upload
                      var blobImage = dataURItoBlob(realData);
                      console.log(blobImage);

                      let file = new File([blobImage], image[0].name, {
                        type: contentType,
                      });
                      console.log(file);

                      setDriverLicence(file);

                      _uploadDocs(file);
                      return;
                    }
                    // setDriverLicence(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-row items-center justify-start text-left space-x-2 cursor-pointer">
            <input
              id="acceptTerms"
              className="form-checkbox border border-swooveGray-800 cursor-pointer"
              type="checkbox"
              checked={allDataValid}
              onChange={() => {
                setAllDataValid(!allDataValid);
              }}
            />
            <label
              htmlFor="acceptTerms"
              className="leading-tight font-normal cursor-pointer"
            >
              By clicking proced you agree that the details provided in this
              form are all valid.
            </label>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end">
          <button
            className={`bg-primary-main rounded-md px-4 py-2 w-max flex flex-row items-center space-x-2 cursor-pointer`}
            onClick={async (ev) => {
              ev.preventDefault();

              // console.log(allDataValid);

              if (!driverLicence) {
                toast.error("Attach an image of your ID");
                return;
              }

              if (!allDataValid) {
                toast.error("Confirm all data provided is valid");
                return;
              }

              _updateInsuranceDetails();
            }}
          >
            <span> Proceed </span>
          </button>
        </div>
      </div>
      <DocumentView
        document={previewDoc?.doc}
        show={previewDoc ? true : false}
        type={previewDoc?.type}
        onClose={() => {
          setPreviewDoc(null);
        }}
      />
    </div>
  );
};

export default QuoteDetails;
