import React, { FC, useEffect, useState } from "react";
import type { NextPage } from "next";
import FormGroup from "../components/form-group";
import ListBox from "../components/list-box";
import { TypeOfUseProps } from "../types";
import { mkPostReq } from "../utils/functions";
import checkPremium from "../utils/check-premium";
import { toast } from "react-toastify";

const CheckPremium: FC<{ onRequestCover?: (request_data: any) => void; isModal?: boolean }> = ({
  onRequestCover,
  isModal,
}) => {
  // premium calculation params

  const [typeOfQuote, setTypeOfQuote] = useState<string>("");
  const [vehicleType, setTypeOfCar] = useState<string>("");
  const [registrationYear, setYearOfRegistration] = useState<any>("");
  const [vehicleInsuredValue, setVehicleValue] = useState<any>("");
  const [vehicleUse, setTypeOfUse] = useState<string>("");
  const [numOfPassenger, setPassengerCount] = useState<number | "">("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [noOfInstallments, setInstallmentCount] = useState<string>("");
  const [employerType, setEmployerType] = useState<string>("");
  const [referredFrom, setReferredFrom] = useState<string>("");

  const [premiumCheckData, setPremiumCheckData] = useState<any>({});
  const [premiumCheckResponse, setPremiumCheckResponse] = useState<any>({});

  const [premiumDue, setPremiumDue] = useState<string | null>(null);
  const [initialPremium, setInitialPremium] = useState<string | null>(null);

  const [installmentOptions, setInstallmentOptions] = useState<{ name: string; value: string; id: string }[]>([]);

  const _handleCheckPremium = async () => {
    if (vehicleType === "") {
      toast.error("Select vehicle type");
      return;
    }
    if (registrationYear === "") {
      toast.error("Select vehicle's registration year");
      return;
    }
    if (vehicleInsuredValue < 1) {
      toast.error("Enter vehicles current/insured value");
      return;
    }
    if (vehicleUse === "") {
      toast.error("Select vehicle's type of use");
      return;
    }
    if (numOfPassenger < 1) {
      toast.error("Enter the number of passengers your vehicle can take");
      return;
    }
    if (employerType === "") {
      toast.error("Please add your employer type");
      return;
    }
    if (noOfInstallments === "") {
      toast.error("Select an installment option");
      return;
    }

    let premium_check_data = {
      noOfInstallments,
      numOfPassenger,
      protectionType: "COMPREHENSIVE",
      registrationYear,
      vehicleUse,
      vehicleInsuredValue,
      vehicleType,
      employerType,
    };
    setPremiumCheckData(premium_check_data);
    console.log(premium_check_data);

    let premium_check_result = await mkPostReq({
      endpoint: "/api/quote/getPremium",
      method: "post",
      data: JSON.stringify(premium_check_data),
      isJSON: true,
    });
    console.log(premium_check_result);

    if (premium_check_result.message === "ERROR_MESSAGE") {
      toast.error("Failed to get Quote");
      return;
    }

    setPremiumCheckResponse(premium_check_result);
    setPremiumDue(premium_check_result.monthlyInstallment.toFixed(2));
    setInitialPremium(premium_check_result.initialDeposit.toFixed(2));
  };

  useEffect(() => {
    let installment_options = [
      {
        name: "",
        value: "No. of Installments",
        id: "0",
      },
    ];
    // {
    //   name: "FULL_PAYMENT",
    //   value: "Full Payment",
    //   id: "1",
    // },
    // {
    //   name: "THREE_MONTHS",
    //   value: "3 months",
    //   id: "2",
    // },
    // {
    //   name: "SIX_MONTHS",
    //   value: "6 months",
    //   id: "3",
    // },
    // {
    //   name: "NINE_MONTHS",
    //   value: "9 months",
    //   id: "4",
    // },
    // {
    //   name: "TWELVE_MONTHS",
    //   value: "12 months",
    //   id: "5",
    // },
    switch (employerType) {
      case "STATE_OR_GOVT":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          },
          {
            name: "SIX_MONTHS",
            value: "6 months",
            id: "3",
          },
          {
            name: "NINE_MONTHS",
            value: "9 months",
            id: "4",
          },
          {
            name: "TWELVE_MONTHS",
            value: "12 months",
            id: "5",
          }
        );
        break;
      case "LARGE_PRIVATE_COMPANY":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          },
          {
            name: "SIX_MONTHS",
            value: "6 months",
            id: "3",
          },
          {
            name: "NINE_MONTHS",
            value: "9 months",
            id: "4",
          }
        );
        break;
      case "SME":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          },
          {
            name: "SIX_MONTHS",
            value: "6 months",
            id: "3",
          }
        );
        break;
      case "SELF_EMPLOYED_PRIVATE_PRACTITIONER":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          }
        );
        break;
      case "UBER_BOLT_YANGO":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          },
          {
            name: "SIX_MONTHS",
            value: "6 months",
            id: "3",
          }
        );
        break;
      case "COMMERCIAL_UNION":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          },
          {
            name: "SIX_MONTHS",
            value: "6 months",
            id: "3",
          }
        );
        break;
      case "OTHER":
        installment_options.push(
          {
            name: "FULL_PAYMENT",
            value: "Full Payment",
            id: "1",
          },
          {
            name: "THREE_MONTHS",
            value: "3 months",
            id: "2",
          }
        );
        break;
    }

    setInstallmentOptions(installment_options);
  }, [employerType]);

  return (
    <div
      className={`bg-white w-full max-w-md px-2 md:px-12 ${
        isModal ? "py-10" : "py-20"
      }  items-center justify-center shadow-sm rounded-xl space-y-8 md:space-y-20`}
    >
      <div className="w-full flex flex-row">
        <img className="w-16 mx-auto" src="/img/car-icon-vector.svg" alt="Check Insurance" />
      </div>
      <form
        autoComplete="false"
        className="w-full"
        onSubmit={(ev) => {
          ev.preventDefault();
          _handleCheckPremium();
        }}
      >
        <input autoComplete="off" name="hidden" id="hidden" type="text" className="hidden" />
        <div className="w-full flex-col space-y-5">
          <ListBox
            className="bg-[#101d490d] border-none"
            id="type_of_car"
            values={[
              {
                name: "",
                value: "Type of Car",
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
              value: "Type of Car",
              id: "0",
            }}
            onValueChange={(_type: any) => {
              console.log(_type);
              setTypeOfCar(_type.name);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          <ListBox
            className="bg-[#101d490d] border-none"
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
              console.log(_YoR);
              setYearOfRegistration(_YoR.name);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          <FormGroup
            type="number"
            id="vehicleValue"
            placeholder="Current/Insured value (GHS)"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={vehicleInsuredValue}
            onValueChanged={(_val: any) => {
              // console.log(_val.target.value);
              setVehicleValue(_val.target.value);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
            onFocusOut={(_val: any) => {
              // console.log(_val.target.value);
              setVehicleValue(_val.target.value);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          <ListBox
            className="bg-[#101d490d] border-none"
            id="vehicle_type_of_use"
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
              console.log(_type);
              setTypeOfUse(_type.name);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          <FormGroup
            type="number"
            min={1}
            id="passengerCount"
            placeholder="Number of passengers (including driver)"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={numOfPassenger}
            onValueChanged={(_val: any) => {
              console.log(_val.target.value);
              setPassengerCount(_val.target.value);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
            onFocusOut={(_val: any) => {
              console.log(_val.target.value);
              setPassengerCount(_val.target.value);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          <ListBox
            className="bg-[#101d490d] border-none"
            id="employer_type"
            values={[
              {
                name: "",
                value: "Employer type",
                id: "0",
              },
              {
                name: "STATE_OR_GOVT",
                value: "State or Government Organisation",
                id: "1",
              },
              {
                name: "LARGE_PRIVATE_COMPANY",
                value: "Large Private Company",
                id: "2",
              },
              {
                name: "SME",
                value: "SME",
                id: "3",
              },
              {
                name: "SELF_EMPLOYED_PRIVATE_PRACTITIONER",
                value: "Self Employed/Private Practitioner",
                id: "4",
              },
              {
                name: "UBER_BOLT_YANGO",
                value: "Uber/Bolt/Yango",
                id: "4",
              },
              {
                name: "COMMERCIAL_UNION",
                value: "Commercial Union",
                id: "4",
              },
              {
                name: "OTHER",
                value: "Other",
                id: "4",
              },
            ]}
            selected={{
              name: "",
              value: "Employer type",
              id: "0",
            }}
            onValueChange={(_type: any) => {
              console.log(_type);
              setEmployerType(_type.name);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          <ListBox
            className="bg-[#101d490d] border-none"
            id="number_of_installments"
            values={installmentOptions}
            selected={{
              name: "",
              value: "No. of Installments",
              id: "0",
            }}
            onValueChange={(_IstCnt: any) => {
              console.log(_IstCnt);
              setInstallmentCount(_IstCnt.name);
              setPremiumDue(null);
              setInitialPremium(null);
            }}
          />

          {noOfInstallments === "full_payment"
            ? premiumDue && <p className="w-max mx-auto text-5xl font-bold">&#8373;{premiumDue}</p>
            : premiumDue && (
                <div>
                  <p>
                    Initial Deposit: <span className="font-bold text-lg">&#8373;{initialPremium}</span>
                  </p>
                  <p>
                    Monthly installment: <span className="font-bold text-lg">&#8373;{premiumDue}</span>
                    <span>
                      {noOfInstallments === "full_payment"
                        ? ""
                        : `/m for ${String(noOfInstallments).split("_")[0]} months`}
                    </span>
                  </p>
                </div>
              )}

          {/* {premiumDue && <p className="w-max mx-auto text-5xl font-bold">&#8373;{premiumDue}</p>} */}
          {/* {monthlyPremium && <p className="w-max mx-auto text-5xl font-bold">&#8373;{monthlyPremium}</p>} */}

          {premiumDue ? (
            <button
              className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4"
              onClick={(ev) => {
                ev.preventDefault();
                onRequestCover && onRequestCover({ ...premiumCheckData, ...premiumCheckResponse });
              }}
            >
              <span> Request Cover </span>
            </button>
          ) : (
            <button
              className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4"
              type="submit"
            >
              <span>Submit</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckPremium;
