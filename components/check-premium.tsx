import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import FormGroup from "../components/form-group";
import ListBox from "../components/list-box";
import { TypeOfUseProps } from "../types";
import { mkPostReq } from "../utils/functions";

const CheckPremium: NextPage = () => {
  // premium calculation params

  const [yearOfRegistration, setYearOfRegistration] = useState<any>("");
  const [vehicleValue, setVehicleValue] = useState<any>("");
  const [typeOfUse, setTypeOfUse] = useState<string>("");
  const [passengerCount, setPassengerCount] = useState<number | "">("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [installmentCount, setInstallmentCount] = useState<string>("");

  const [premiumDue, setPremiumDue] = useState<number>(0);

  const _handleCheckPremium = async () => {
    let premium_check_data = {
      installment_count: installmentCount,
      passenger_count: Number(passengerCount),
      type_of_use: typeOfUse,
      vehicle_value: Number(vehicleValue),
      whatsapp_number: whatsappNumber,
      year_of_registration: yearOfRegistration,
    };

    var premium_check_result = await mkPostReq({
      endpoint: "/api/checkPremium",
      method: "post",
      isJSON: true,
      data: JSON.stringify(premium_check_data),
    });
    console.log(premium_check_result);
    setPremiumDue(premium_check_result.total_premium_due);
  };

  return (
    <div className="bg-white w-full max-w-md px-2 md:px-12 py-20 items-center justify-center shadow-sm rounded-xl space-y-8 md:space-y-20">
      <div className="w-full flex flex-row">
        <img className="w-16 mx-auto" src="/img/car-icon-vector.svg" alt="Check Insurance" />
      </div>
      <form autoComplete="false" className="w-full">
        <input autoComplete="off" name="hidden" id="hidden" type="text" className="hidden" />
        <div className="w-full flex-col space-y-5">
          <ListBox
            className="bg-[#101d490d] border-none"
            id="year_of_registration"
            values={[
              {
                name: "type_of_car",
                value: "Year of Registration",
                id: "0",
              },
              {
                name: "2022",
                value: "2022",
                id: "1",
              },
              {
                name: "2021",
                value: "2021",
                id: "1",
              },
              {
                name: "2020",
                value: "2020",
                id: "1",
              },
              {
                name: "2019",
                value: "2019",
                id: "1",
              },
              {
                name: "2018",
                value: "2018",
                id: "1",
              },
              {
                name: "2017",
                value: "2017",
                id: "1",
              },
              {
                name: "before_2017",
                value: "Before 2017",
                id: "1",
              },
            ]}
            selected={{
              name: "year_of_registration",
              value: "Year of Registration",
              id: "0",
            }}
            onValueChange={(_YoR: any) => {
              console.log(_YoR);
              setYearOfRegistration(_YoR.name);
            }}
          />

          <FormGroup
            type="number"
            id="vehicleValue"
            placeholder="Current value"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={vehicleValue}
            onValueChanged={(_val: any) => {
              // console.log(_val.target.value);
              setVehicleValue(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              // console.log(_val.target.value);
              setVehicleValue(_val.target.value);
            }}
          />

          <ListBox
            className="bg-[#101d490d] border-none"
            id="vehicle_type_of_use"
            values={[
              {
                name: "type_of_use",
                value: "Type of use",
                id: "0",
              },
              {
                name: "private_individual",
                value: "Private Use (Individul Owned)",
                id: "1",
              },
              {
                name: "private_company",
                value: "Private Use (Company Owned)",
                id: "2",
              },
              {
                name: "ride_hail",
                value: "Uber/Bolt/Yango/Etc",
                id: "3",
              },
              {
                name: "taxi",
                value: "Taxi",
                id: "4",
              },
              {
                name: "hiring_car",
                value: "Hiring Car",
                id: "5",
              },
              {
                name: "omni_bus",
                value: "Omni Bus",
                id: "6",
              },
              {
                name: "own_goods",
                value: "Own Goods Carrying Vehicle",
                id: "7",
              },
              {
                name: "general_cartage",
                value: "General Cartage",
                id: "8",
              },
            ]}
            selected={{
              name: "type_of_use",
              value: "Type of use",
              id: "0",
            }}
            onValueChange={(_type: any) => {
              console.log(_type);
              setTypeOfUse(_type.name);
            }}
          />

          <FormGroup
            type="number"
            min={1}
            id="passengerCount"
            placeholder="Number of passengers (including driver)"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={passengerCount}
            onValueChanged={(_val: any) => {
              console.log(_val.target.value);
              setPassengerCount(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              console.log(_val.target.value);
              setPassengerCount(_val.target.value);
            }}
          />

          <FormGroup
            type="tel"
            id="whatsappNumber"
            placeholder="Whatsapp number"
            className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
            value={whatsappNumber}
            onValueChanged={(_val: any) => {
              console.log(_val.target.value);
              setWhatsappNumber(_val.target.value);
            }}
            onFocusOut={(_val: any) => {
              console.log(_val.target.value);
              setWhatsappNumber(_val.target.value);
            }}
          />

          <ListBox
            className="bg-[#101d490d] border-none"
            id="number_of_installments"
            values={[
              {
                name: "number_of_installments",
                value: "No. of Installments",
                id: "0",
              },
              {
                name: "full_payment",
                value: "Full Payment",
                id: "1",
              },
              {
                name: "3_months",
                value: "3 months",
                id: "2",
              },
              {
                name: "6_months",
                value: "6 months",
                id: "3",
              },
              {
                name: "9_months",
                value: "9 months",
                id: "4",
              },
              {
                name: "12_months",
                value: "12 months",
                id: "5",
              },
            ]}
            selected={{
              name: "number_of_installments",
              value: "No. of Installments",
              id: "0",
            }}
            onValueChange={(_IstCnt: any) => {
              console.log(_IstCnt);
              setInstallmentCount(_IstCnt.name);
            }}
          />

          {premiumDue > 0 && <p className="w-max mx-auto text-5xl font-bold">&#8373;{premiumDue.toFixed(2)}</p>}

          <button
            className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4"
            onClick={(ev) => {
              ev.preventDefault();
              _handleCheckPremium();
            }}
          >
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckPremium;
