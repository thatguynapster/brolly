import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import FormGroup from "../components/form-group";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import ListBox from "../components/list-box";
import Footer from "../components/footer";
import CookieNotice from "../components/cookie-notice";
import { ArrowRightIcon } from "@heroicons/react/outline";

const Home: NextPage = () => {
  const [basePath, setBasePath] = useState<string | null>(null);

  useEffect(() => {
    console.log(window.location.origin);
    setBasePath(window.location.origin);
  }, [basePath]);

  return (
    <>
      <HeadFile title={SEOConfig.title} canonical={`${basePath}`} />
      <Header
        onGetQuote={() => {
          console.log("scroll to get quote section");
          // if (process.browser) {
          let getQuote = document.getElementById("getQuote");
          getQuote?.scrollIntoView();
          // }
        }}
      />
      <main className="bg-white flex flex-col justify-center items-center">
        {/* landing area */}
        <section className="h-screen max-w-7xl mx-auto mt-[-60px] md:mt-[-112px] px-8 sm:px-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold leading-[38px]md:leading-[96px]">
              Pay Monthly for <br /> Car Insurance
            </h1>
            <p className="text-center md:text-left font-paragraphs text-[#848484] text-xs md:text-md leading-[14px] md:leading-[21px]">
              No need to empty your bank account. Live life fully, pay your insurance monthly, get claims paid at
              lightning speed.
            </p>

            <Link href="/how-it-works" passHref>
              <a className="text-base font-medium text-dark bg-primary-main py-2 px-4 w-max flex items-center mx-auto md:ml-0 space-x-4">
                <span> How it works</span>
                <ArrowRightIcon className="w-4 h-4 animate-bounceX" />
              </a>
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img className="animate-swell" src="/img/landing-illustration.svg" alt="Main Illustration" />
          </div>
        </section>
        {/* END landing area */}

        {/* features */}
        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-8 flex flex-col items-center justify-center space-y-10 md:space-y-20">
          <h2 className="text-center text-[30px] md:text-6xl font-headings font-bold md:leading-[61px]">
            Brolly is insurance built to suit <br className="hidden md:flex" /> your lifestyle
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:space-x-8 space-y-8 md:space-y-0">
            <div className="flex flex-col justify-center items-center space-x-8 space-y-4">
              {/* <div className="w-1/3"> */}
              <img src="/img/100-digital.svg" alt="100% digital" />
              {/* </div> */}
              <div className="flex flex-col justify-center text-center">
                <h4 className="font-headings font-semibold text-base md:text-2xl leading-[20px] md:leading-[31px]">
                  100% digital
                </h4>
                <p className="text-[#848484] font-paragraphs text-xs md:text-base leading-[14px] md:leading-[18px]">
                  No boring paperwork, <br className="hidden md:flex" /> everythinghappens online.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center space-x-8 space-y-4">
              {/* <div className="w-1/3"> */}
              <img src="/img/fair-contract.svg" alt="Fair Contract" />
              {/* </div> */}
              <div className="flex flex-col justify-center text-center">
                <h4 className="font-headings font-semibold text-base md:text-2xl leading-[20px] md:leading-[31px]">
                  Fair contract
                </h4>
                <p className="text-[#848484] font-paragraphs text-xs md:text-base leading-[14px] md:leading-[18px]">
                  Simple contracts, no tricks, claims paid at lightning speed.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center space-x-8 space-y-4">
              {/* <div className="w-1/3"> */}
              <img src="/img/open-247.svg" alt="Open 24/7, 365" />
              {/* </div> */}
              <div className="flex flex-col justify-center text-center">
                <h4 className="font-headings font-semibold text-base md:text-2xl leading-[20px] md:leading-[31px]">
                  Open 24/7, 365
                </h4>
                <p className="text-[#848484] font-paragraphs text-xs md:text-base leading-[14px] md:leading-[18px]">
                  If 12am is your best time, we’re here for you.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END features */}

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-4 md:space-y-0">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              No pranks with your claims, <br /> get paid at lightning <br /> speed
            </h2>
            <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
              No IFs, no BUTs when it’s time to pay up. We know how it feels to <br className="hidden md:flex" />
              be left in the cold, and we understand that delays are costly.
            </p>
          </div>

          <img className="" src="/img/no-pranks.svg" alt="No Pranks" />
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="" src="/img/switch-to-brolly.svg" alt="Switch to Brolly" />

          <div className="flex flex-col space-y-4 md:space-y-0">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Switch to Brolly and <br /> get Cash Back
            </h2>
            <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
              If you stay with the old script, you will keep experiencing the old s**t. Switch to Brolly, get Cash Back,
              and experience our best in class service.
            </p>
          </div>
        </section>

        <section className="w-full my-12 md:my-24 bg-background" id="getQuote">
          <div className="px-4 pt-14 pb-10 md:pb-0 md:-mb-6 max-w-7xl mx-auto items-center justify-around space-y-4 md:space-y-0 flex flex-col md:flex-row">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Check the monthly <br className="hidden md:flex" /> cost of <br className="flex md:hidden" /> your{" "}
              <br className="hidden md:flex" /> car insurance
            </h2>

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

                <button className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4">
                  <span>Submit</span>
                  <ArrowRightIcon className="w-4 h-4 animate-bounceX" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-8 flex flex-col items-center justify-center space-y-16 md:space-y-24">
          <div className="flex flex-col items-center space-y-12 md:space-y-8">
            <h2 className="text-center text-[30px] md:text-6xl font-headings font-bold md:leading-[61px] items-center justify-center">
              Launching in Jan 2022 <img className="w-10 inline-flex" src="/img/ghana.jpg" alt="Ghana" />. Join our
              waitlist!
            </h2>
            <p className=" max-w-2xl text-center font-paragraphs text-[#848484] text-xs md:text-md leading-[14px] md:leading-[21px]">
              Register your interest to join our take-off 🚀 in January. Guaranteed deals and gifts for first 1000
              people on our waitlist.
            </p>

            <div className="grid grid-cols-7 w-full max-w-md">
              <div className="col-span-4">
                <FormGroup
                  type="tel"
                  id="waitlistInput"
                  placeholder="Whatsapp number"
                  className="rounded-[0px] placeholder-[#848484] focus:ring-primary-border"
                  onValueChanged={(ev: any) => {
                    console.log(ev);
                  }}
                  onFocusOut={(ev: any) => {
                    console.log(ev);
                  }}
                />
              </div>
              <button className="col-span-3 bg-primary-main px-4 font-semibold flex items-center justify-center space-x-4">
                <span>Subscribe to Join</span>
                <ArrowRightIcon className="w-4 h-4 animate-bounceX" />
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row bg-primary-main pt-5 pb-14 md:pb-5 px-4 md:px-8 rounded-md md:items-center">
            <img
              className="w-11/12 md:w-1/4 mx-auto"
              src="/img/someone-deserves-brolly.svg"
              alt="Image for Know someone who deserves the Brolly experience?"
            />

            <div className="space-y-6 md:space-y-4">
              <h2 className="text-center md:text-left text-[30px] md:text-6xl font-headings font-bold leading-[32px] md:leading-[61px]">
                Know someone who deserves the Brolly experience?
              </h2>

              <p className="text-center md:text-left font-paragraphs text-sm md:text-md leading-[14px] md:leading-[21px]">
                Bring your loved ones to Brolly and earn cool cash. It’s that simple.
              </p>

              <p className="text-center md:text-left font-paragraphs font-semibold text-sm md:text-md leading-[14px] md:leading-[21px] underline">
                Join Brolly Referral Network.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:items-center md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="mx-auto md:w-2/3" src="/img/think-different.svg" alt="Switch to Brolly" />

          <div className="flex flex-col space-y-6 md:space-y-10 w-full md:w-3/4">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Got blue hair with an <br /> awesome brain? Join our <br /> team
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                We’re hiring the most incredible customer-obsessed team <br className="flex md:hidden" /> to re-write{" "}
                <br className="hidden md:flex" />
                the insurance script in Africa. Errm...our pecks <br className="flex md:hidden" /> include 1 full day to{" "}
                <br className="hidden md:flex" />
                yourself every month to do anything <br className="flex md:hidden" /> you choose to make an impact{" "}
                <br className="hidden md:flex" /> in your world.
              </p>

              <p className="text-center md:text-left text-[#848484] font-bold font-paragraphs text-xs md:text-base leading-tight">
                Forget boring CV, tell us what we’re missing by not <br className="flex md:hidden" /> having you{" "}
                <br className="hidden md:flex" /> on our team.
              </p>
            </div>

            <div className="flex flex-row justify-center md:justify-start items-center space-x-4 text-black">
              <img className="w-5" src="/icons/message.svg" alt="Message" />
              <Link href="mailto:team@brollyinsurance.com">
                <p className="text-center md:text-left font-semibold font-headings text-md cursor-pointer">
                  team@brollyinsurance.com
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer pagename="home" />
    </>
  );
};

export default Home;
