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
import CheckPremium from "../components/check-premium";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import JoinWaitlist from "../components/join-waitlist";

const Home: NextPage = () => {
  const [basePath, setBasePath] = useState<string | null>(null);

  useEffect(() => {
    console.log(window.location.origin);
    setBasePath(window.location.origin);
  }, [basePath]);

  return (
    <>
      <HeadFile title={SEOConfig.title} canonical={`${basePath}`} />
      <Header pagename="home" />
      <main className="bg-white flex flex-col justify-center items-center">
        {/* landing area */}
        <section className="h-screen max-w-7xl mx-auto mt-[-60px] md:mt-[-112px] px-8 sm:px-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h1 className="text-center md:text-left text-[42px] md:text-7xl font-headings font-bold leading-[40px] md:leading-[80px]">
              Pay Monthly for <br /> Car Insurance
            </h1>
            <p className="text-center md:text-left font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
              No need to empty your bank account. Live life fully, pay your insurance monthly, get claims paid at
              lightning speed.
            </p>

            <Link href="/how-it-works" passHref>
              <button className="text-base font-medium text-dark bg-primary-main py-2 px-4 w-max flex items-center mx-auto md:ml-0 space-x-4">
                <span> How it works</span>
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img className="animate-swell" src="/img/landing-illustration.svg" alt="Main Illustration" />
          </div>
        </section>
        {/* END landing area */}

        {/* features */}
        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-8 flex flex-col items-center justify-center space-y-10 md:space-y-20">
          <h2 className="font-headings font-bold text-center text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
            Brolly is insurance built to suit <br className="hidden md:flex" /> your lifestyle
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:space-x-8 space-y-8 md:space-y-0">
            <div className="flex flex-col items-center space-y-4">
              <img src="/img/100-digital.svg" alt="100% digital" />
              <div className="flex flex-col justify-center text-center space-y-4">
                <h4 className="font-headings font-semibold text-lg md:text-2xl leading-[20px] md:leading-[31px]">
                  100% digital
                </h4>
                <p className="text-center font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
                  No boring paperwork, <br className="hidden md:flex" /> everythinghappens online.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <img src="/img/fair-contract.svg" alt="Fair Contract" />
              <div className="flex flex-col justify-center text-center space-y-4">
                <h4 className="font-headings font-semibold text-lg md:text-2xl leading-[20px] md:leading-[31px]">
                  Fair contract
                </h4>
                <p className="text-center font-paragraphs text-[#848484] text-base leading-[20px] md:leading-[24px]">
                  Simple contracts, no tricks, claims paid at lightning speed.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <img src="/img/open-247.svg" alt="Open 24/7, 365" />
              <div className="flex flex-col justify-center text-center space-y-4">
                <h4 className="font-headings font-semibold text-lg md:text-2xl leading-[20px] md:leading-[31px]">
                  Open 24/7, 365
                </h4>
                <p className="text-center font-paragraphs text-[#848484] text-base  leading-[20px] md:leading-[24px]">
                  If 12am is your best time, we’re here for you.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END features */}

        <section className="w-full mt-24 max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-4 md:space-y-0">
            <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
              No pranks with your claims, <br /> get paid at lightning <br /> speed
            </h2>
            <p className="text-center md:text-left font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
              No IFs, no BUTs when it’s time to pay up. We know how it feels to <br className="hidden md:flex" />
              be left in the cold, and we understand that delays are costly.
            </p>
          </div>

          <img className="" src="/img/no-pranks.svg" alt="No Pranks" />
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="" src="/img/switch-to-brolly.svg" alt="Switch to Brolly" />

          <div className="flex flex-col space-y-4 md:space-y-0">
            <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
              Switch to Brolly and <br /> get Cash Back
            </h2>
            <p className="text-center md:text-left font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
              If you stay with the old script, you will keep experiencing the old s**t. Switch to Brolly, get Cash Back,
              and experience our best in class service.
            </p>
          </div>
        </section>

        <section className="w-full my-12 md:my-24 bg-background" id="getQuote">
          <div className="px-4 pt-14 pb-10 md:pb-0 md:-mb-6 max-w-7xl mx-auto items-center justify-around space-y-4 md:space-y-0 flex flex-col md:flex-row">
            <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
              Check the monthly <br className="hidden md:flex" /> cost of <br className="flex md:hidden" /> your{" "}
              <br className="hidden md:flex" /> car insurance
            </h2>

            <CheckPremium />
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-8 flex flex-col items-center justify-center space-y-16 md:space-y-24">
          <div className="flex flex-col items-center space-y-12 md:space-y-8">
            <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
              Launching in Jan 2022 <img className="w-10 inline-flex" src="/img/ghana.jpg" alt="Ghana" />. Join our
              waitlist!
            </h2>
            <p className="max-w-2xl text-center font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
              Register your interest to join our take-off 🚀 in January. Guaranteed deals and gifts for first 1000
              people on our waitlist.
            </p>

            <>
              {/* <div className="grid grid-cols-7 w-full max-w-md">
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
                </button>
              </div> */}
              <MailchimpSubscribe
                url={`https://genhybridsystems.us1.list-manage.com/subscribe/post?u=${process.env.MAILCHIMP_U}&id=${process.env.MAILCHIMP_ID}`}
                render={({ subscribe, status, message }) => (
                  <>
                    <JoinWaitlist status={status} message={message} onValidated={(formData) => subscribe(formData)} />
                  </>
                )}
              />
            </>
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

              <div className="flex flex-col space-y-4">
                <p className="text-center md:text-left font-paragraphs text-base md:text-md leading-[20px] md:leading-[24px]">
                  Bring your loved ones to Brolly and earn cool cash. It’s that simple.
                </p>

                <Link href="/network" passHref>
                  <a
                    href="#"
                    className="text-center md:text-left font-paragraphs font-semibold text-sm md:text-md leading-[14px] md:leading-[21px] underline"
                  >
                    Join Brolly Referral Network.
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:items-center md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="mx-auto md:w-2/3" src="/img/think-different.svg" alt="Switch to Brolly" />

          <div className="flex flex-col space-y-6 md:space-y-10 w-full md:w-3/4">
            <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
              Got blue hair with an <br className="hidden md:flex" /> awesome brain? Join our{" "}
              <br className="hidden md:flex" /> team
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-center md:text-left font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
                We’re hiring the most incredible customer-obsessed team to re-write <br className="hidden md:flex" />
                the insurance script in Africa. Errm...our pecks include 1 full day to <br className="hidden md:flex" />
                yourself every month to do anything you choose to make an impact <br className="hidden md:flex" /> in
                your world.
              </p>

              <p className="text-center md:text-left font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px] font-bold">
                Forget boring CV, tell us what we’re missing by not having you <br className="hidden md:flex" /> on our
                team.
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
