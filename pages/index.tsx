import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import FormGroup from "../components/form-group";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import { KeyIcon, MailIcon } from "@heroicons/react/outline";
import Header from "../components/header";
import { useMediaQuery } from "react-responsive";

const Home: NextPage = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <HeadFile title={`${SEOConfig.title}`} />
      <Header />
      <main className="bg-white flex flex-col justify-center items-center px-4 md:px-0 mb-[74px] md:mb-0">
        {/* landing area */}
        <section
          className={`h-screen mt-[-80px] md:mt-[-112px] max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0`}
        >
          <div className="md:w-1/2 flex-col space-y-4">
            <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold md:leading-[96px]">
              Pay Monthly for <br /> Car Insurance
            </h1>
            <p className="text-center md:text-left font-paragraphs text-[#848484] text-md">
              No need to empty your bank account. Live life fully, pay your insurance monthly, get claims paid at
              lightning speed.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img className="animate-swell" src="/img/landing-illustration.svg" alt="Main Illustration" />
          </div>
        </section>
        {/* END landing area */}

        {/* features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8 flex flex-col items-center justify-center space-y-10 md:space-y-20">
          <h2 className="text-center text-[30px] md:text-6xl font-headings font-bold md:leading-[61px]">
            Brolly is insurance built to suit <br /> your lifestyle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-8">
            <div className="flex flex-row justify-center items-center space-x-8">
              {/* <div className="w-1/3"> */}
              <img src="/img/100-digital.svg" alt="100% digital" />
              {/* </div> */}
              <div className="flex flex-col justify-center">
                <h4 className="font-headings font-semibold text-2xl">100% digital</h4>
                <p className="text-[#848484] text-base leading-tight">
                  No boring paperwork, <br /> everythinghappens online.
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center space-x-8">
              {/* <div className="w-1/3"> */}
              <img src="/img/fair-contract.svg" alt="100% digital" />
              {/* </div> */}
              <div className="flex flex-col justify-center">
                <h4 className="font-headings font-semibold text-2xl">100% digital</h4>
                <p className="text-[#848484] text-base leading-tight">
                  Simple contracts, no tricks, <br /> claims paid at lightning speed.
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center space-x-8">
              {/* <div className="w-1/3"> */}
              <img src="/img/open-247.svg" alt="100% digital" />
              {/* </div> */}
              <div className="flex flex-col justify-center">
                <h4 className="font-headings font-semibold text-2xl">100% digital</h4>
                <p className="text-[#848484] text-base leading-tight">
                  If 12am is your best <br /> time, we’re here for you.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END features */}

        {/* should stick to bottom of page in mobile */}
        <div className="fixed bottom-0 left-0 right-0">
          <a
            href="#"
            className="w-1/2 whitespace-nowrap inline-flex items-center justify-center px-4 py-6 border border-transparent text-base font-medium bg-primary-main"
          >
            Get a Quote
          </a>
          <a
            href="#"
            className="w-1/2 whitespace-nowrap inline-flex items-center justify-center px-4 py-6 border border-transparent text-base font-medium bg-background"
          >
            24/7 support
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
