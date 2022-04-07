import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import JoinWaitlist_New from "../components/join-waitlist-new";
import Footer_New from "../components/footer-new";

const Home: NextPage = () => {
  const [basePath, setBasePath] = useState<string | null>(null);

  const [showPremiumRequestModal, setShowPremiumRequestModal] =
    useState<boolean>(false);
  const [showPremiumRequestResponseModal, setShowPremiumRequestResponseModal] =
    useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [whatsappNumberValid, setWhatsappNumberValid] =
    useState<boolean>(false);

  async function _handlePhoneNumber(
    field: string,
    value: string,
    isValid: boolean,
    dial_code: string
  ) {
    setWhatsappNumberValid(isValid);
    setWhatsappNumber(String(value.split("+").pop()));
  }

  useEffect(() => {
    // console.log(window.location.origin);
    setBasePath(window.location.origin);
  }, [basePath]);

  return (
    <>
      <HeadFile title={SEOConfig.title} canonical={`${basePath}`} />
      <Header pagename="home" />
      <main className="bg-white flex flex-col justify-center items-center space-y-20">
        {/* landing area */}
        <section className="md:h-[75vh] max-w-7xl mx-auto mt-[20px] md:mt-[0px] px-8 sm:px-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h1 className="text-center md:text-left text-[42px] md:text-7xl font-headings font-bold leading-[40px] md:leading-[80px]">
              Stress-free <br /> Car Insurance <br /> for 500 Africans
            </h1>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:-z-0">
            <img
              className="animate-swell"
              src="/img/coming-soon-illustration.svg"
              alt="Main Illustration"
            />
          </div>
        </section>
        {/* END landing area */}

        {/* features */}
        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-8 flex flex-col md:flex-row items-center justify-center ">
          <img
            className="w-1/4 md:w-max mt-[60px] md:mt-0"
            src="/img/ghana-flag.svg"
            alt="Main Illustration"
          />
          <h2 className="font-paragraphs text-center text-[36px] md:text-6xl leading-[32px] md:leading-[56px]">
            Ghana, are you <br className="flex md:hidden" /> ready!
          </h2>
        </section>
        {/* END features */}

        <section className="w-full max-w-7xl mx-auto px-4 sm:px-12 my-12 md:my-24 justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
          <div className="bg-primary-main rounded-xl flex flex-col space-y-11 md:space-y-0 py-12 md:py-28 md:w-10/12 items-center">
            <h2 className="font-headings font-semibold text-center md:text-left text-[32px] md:text-6xl leading-[32px] md:leading-[56px]">
              Easy Monthly Payments
            </h2>
            <h2 className="font-headings font-semibold text-center md:text-left text-[32px] md:text-6xl leading-[32px] md:leading-[56px] line-through decoration-white">
              Huge Annual Payment
            </h2>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 md:space-x-24 items-center justify-center flex flex-col md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-12 md:space-y-16 mb-20">
            <h2 className="font-paragraph font-light text-center md:text-left text-[36px] md:text-6xl leading-[48px] md:leading-[56px]">
              Free <span className="font-bold">GHS200</span> fuel for <br className="flex md:hidden" />{" "}
              first 10,000 sign-ups
            </h2>
            <MailchimpSubscribe
              url={`${process.env.NEXT_PUBLIC_MAILCHIMP_URL}?u=${process.env.NEXT_PUBLIC_MAILCHIMP_U}&id=${process.env.NEXT_PUBLIC_MAILCHIMP_ID}`}
              render={({ subscribe, status, message }) => (
                <>
                  <JoinWaitlist_New
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                </>
              )}
            />
          </div>
        </section>
      </main>

      <Footer_New />
    </>
  );
};

export default Home;
