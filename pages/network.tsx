import type { NextPage } from "next";
import Link from "next/link";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";

const Network: NextPage = () => {
  return (
    <>
      <HeadFile title={SEOConfig.title} />
      <Header />
      <main className="bg-white flex flex-col justify-center items-center">
        <section className="w-full md:my-16 md:justify-center max-w-7xl mx-auto px-8 sm:px-12 flex flex-col space-y-4">
          <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold leading-[38px]md:leading-[96px]">
            Join Brolly Network and make <br className="hidden md:flex" /> cool Cash
          </h1>
          <p className="text-center font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
            Surely you know someone who is getting a bad haircut with their insurance.{" "}
            <Link href="#" passHref>
              <a className="text-primary-main font-bold">Give them the gift of Brolly.</a>
            </Link>
          </p>
          <div className="w-full bg-primary-surface py-10 flex items-center justify-center">
            <img className="w-full max-w-3xl" src="/img/coworkers-meeting.svg" alt="Main Illustration" />
          </div>
        </section>

        <section className="w-full max-w-7xl mt-24 mx-auto px-8 sm:px-12 my-8 flex flex-col items-center justify-center space-y-10 md:space-y-20">
          <h2 className="text-center text-[30px] md:text-6xl font-headings font-bold md:leading-[61px]">
            How It Works
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 space-y-8 md:space-y-0">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40">
                <img className="w-full" src="/img/mobile-login.svg" alt="Signup" />
              </div>
              <div className="flex flex-col justify-center text-center">
                <h4 className="font-headings font-semibold text-base md:text-xl leading-[20px] md:leading-[31px]">
                  Sign up
                </h4>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-40 h-40">
                <img className="w-full" src="/img/share-link.svg" alt="Share Link" />
              </div>
              <div className="flex flex-col justify-center text-center">
                <h4 className="font-headings font-semibold text-base md:text-xl leading-[20px] md:leading-[31px]">
                  Send your SHARE CODE to your loved ones
                </h4>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-40 h-40">
                <img className="w-full" src="/img/bank-note.svg" alt="Open 24/7, 365" />
              </div>
              <div className="flex flex-col justify-center text-center">
                <h4 className="font-headings font-semibold text-base md:text-xl leading-[20px] md:leading-[31px]">
                  Your loved ones use your code/link to insure, you get ghs100, they get ghs100, CASH!!*
                </h4>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-center justify-center">
          <div className="flex flex-col space-y-4 md:space-y-9 items-center">
            <h2 className="font-headings font-semibold text-center text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              It&apos;s that Simple! No IFs, No BUTs.
            </h2>

            <button className="w-max md:flex whitespace-nowrap text-base font-medium bg-primary-main py-2 px-4 border-0 shadow-sm items-center justify-center space-x-4">
              <span> Join the network</span>
            </button>

            <p className="text-center font-paragraphs text-base leading-tight text-[#848484]">
              * Cash rewards for Brolly Network do not apply to policies with annual premium
              <br className="hidden md:flex" /> less than &#8373;1000.
            </p>
          </div>
        </section>
      </main>

      <Footer pagename="about" />
    </>
  );
};

export default Network;
