import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import FormGroup from "../components/form-group";
import ListBox from "../components/list-box";

const CheckPremium: NextPage = () => {
  // premium calculation params
  const [typeOfUse, setTypeOfUse] = useState<string>("");
  const [premiumRate, setPremiumRate] = useState<number>(5);

  useEffect(() => {
    console.log(typeOfUse);
    switch (typeOfUse) {
      case "private_individual":
        setPremiumRate(5);
        break;
      case "private_company":
        setPremiumRate(6);
        break;
        
    }
  }, [typeOfUse]);

  return (
    <div className="bg-white w-full max-w-md px-2 md:px-12 py-20 items-center justify-center shadow-sm rounded-xl space-y-8 md:space-y-20">
      <img className="w-16 mx-auto" src="/img/car-icon-vector.svg" alt="Check Insurance" />
      <div className="w-full flex-col space-y-5">
        <ListBox
          className="bg-[#101d490d] border-none"
          id="type_of_car"
          values={[
            {
              name: "type_of_car",
              value: "Type of Car",
              id: "0",
            },
            {
              name: "some_entry",
              value: "Some Entry",
              id: "1",
            },
          ]}
          selected={{
            name: "type_of_car",
            value: "Type of Car",
            id: "0",
          }}
          onValueChange={(ev: any) => {
            console.log(ev);
          }}
        />
        <FormGroup
          type="number"
          id="vehicleValue"
          placeholder="Current value"
          className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
          onValueChanged={(ev: any) => {
            console.log(ev);
          }}
          onFocusOut={(ev: any) => {
            console.log(ev);
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
              name: "uber",
              value: "Uber",
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
              name: "mini_bus",
              value: "Mini Bus",
              id: "6",
            },
            {
              name: "maxi_bus",
              value: "Maxi Bus",
              id: "7",
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
          onValueChanged={(ev: any) => {
            console.log(ev);
          }}
          onFocusOut={(ev: any) => {
            console.log(ev);
          }}
        />

        <FormGroup
          type="tel"
          id="whatsappNumber"
          placeholder="Whatsapp number"
          className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
          onValueChanged={(ev: any) => {
            console.log(ev);
          }}
          onFocusOut={(ev: any) => {
            console.log(ev);
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
          onValueChange={(ev: any) => {
            console.log(ev);
          }}
        />

        <button className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4">
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
};

export default CheckPremium;
