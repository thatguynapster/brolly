import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";
import FormGroup from "../components/form-group";
import ListBox from "../components/list-box";

const HowItWorks: NextPage = () => {
  return (
    <>
      <HeadFile title={SEOConfig.title} />
      <Header />
      <main className="bg-white flex flex-col justify-center items-center">
        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 flex flex-col space-y-4">
          <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold leading-[38px]md:leading-[96px]">
            Pay for your Insurance in <br className="hidden md:flex" /> installments of up to 12 months
          </h1>
          <div className="w-full py-10 flex items-center justify-center">
            <img className="w-full max-w-3xl" src="/img/calendar.svg" alt="Main Illustration" />
          </div>
        </section>

        <section className="w-full my-12 md:my-24 bg-background" id="getQuote">
          <div className="px-4 pt-14 pb-10 md:pb-0 md:-mb-6 max-w-7xl mx-auto items-center justify-around space-y-4 md:space-y-0 flex flex-col md:flex-row md:space-x-32">
            <div className="flex flex-col space-y-6">
              <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
                You can pay for your <br className="hidden md:flex" /> car insurance <br className="flex md:hidden" />
                in 3, 6, or
                <br className="hidden md:flex" /> 12 months
              </h2>
              <p className="text-md text-[#848484] text-center md:text-justify">
                Simply check the monthly cost of your insurance below by selecting the number of months you would like
                to pay. Once you’re happy with your quote, select proceed to complete the installment form. A member of
                our team will ring you within 30 minutes to complete the process and get you insured.
              </p>
            </div>

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
                  onValueChange={(ev: any) => {
                    console.log(ev);
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

                <button className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-4 px-6 border-0 shadow-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:items-center md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="mx-auto md:w-2/3" src="/img/questions.svg" alt="Switch to Brolly" />

          <div className="flex flex-col space-y-6 md:space-y-10 w-full md:w-3/4">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              When does your <br /> insurance cover begin?
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                Insurance cover begins as soon as your installment request is <br className="" /> accepted. A member of
                our team will guide you to set up the <br className="" /> monthly payment instruction with your bank and
                we&apos;re ready to <br className="" /> get you protected.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-center justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-4 md:space-y-0">
            <h2 className="font-headings font-bold text-center md:text-right text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Do you have full <br /> insurance?
            </h2>
            <p className="text-center md:text-right text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
              Yes, you are fully insured under our installment terms. You are <br className="hidden md:flex" /> entitled
              to all the benefits that your insurance offers.
            </p>
          </div>

          <img className="" src="/img/full-insurance.svg" alt="Full Insurance" />
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:items-center md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="mx-auto md:w-2/3" src="/img/full-claim.svg" alt="Full Claim" />

          <div className="flex flex-col space-y-6 md:space-y-10 w-full md:w-3/4">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Would you be paid a full <br className="hidden md:flex" /> claim in case of an{" "}
              <br className="hidden md:flex" /> accident?
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                Absolutely, yes. You’re fully insured so you will receive full <br /> benefit for your insurance in case
                of an accident. The remainder <br /> of your annual premiums becomes due in case you make a claim <br />{" "}
                and you haven’t finished settling your premium.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer pagename="about" />
    </>
  );
};

export default HowItWorks;
