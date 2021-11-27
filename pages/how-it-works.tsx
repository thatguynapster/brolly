import type { NextPage } from "next";
import Link from "next/link";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";

const HowItWorks: NextPage = () => {
  return (
    <>
      <HeadFile title={SEOConfig.title} />
      <Header />
      <main className="bg-white flex flex-col justify-center items-center">
        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 flex flex-col space-y-4">
          <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold leading-[38px]md:leading-[96px]">
            Join Brolly Network and make <br className="hidden md:flex" /> cool Cash
          </h1>
          <p className="text-center md:text-left font-paragraphs text-[#848484] text-xs md:text-md leading-[14px] md:leading-[21px]">
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

          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:space-x-8 space-y-8 md:space-y-0">
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
              {/* <div className="w-1/3"> */}
              <img src="/img/mobile-login.svg" alt="Signup" />
              {/* </div> */}
              <div className="flex flex-col justify-center text-center md:text-left">
                <h4 className="font-headings font-semibold text-base md:text-xl leading-[20px] md:leading-[31px]">
                  Sign up
                </h4>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
              {/* <div className="w-1/3"> */}
              <img src="/img/share-link.svg" alt="Share Link" />
              {/* </div> */}
              <div className="flex flex-col justify-center text-center md:text-left">
                <h4 className="font-headings font-semibold text-base md:text-xl leading-[20px] md:leading-[31px]">
                  Send your SHARE CODE to your loved ones
                </h4>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
              {/* <div className="w-1/3"> */}
              <img src="/img/bank-note.svg" alt="Open 24/7, 365" />
              {/* </div> */}
              <div className="flex flex-col justify-center text-center md:text-left">
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

            <button className="hidden w-max md:flex whitespace-nowrap text-base font-medium bg-primary-main py-4 px-6 border-0 shadow-sm">
              Connect with us
            </button>

            <p className="text-center font-paragraphs text-xs md:text-base leading-tight text-[#848484]">
              * Cash rewards for Brolly Network do not apply to policies with annual premium <br /> less that ghs1000.
            </p>
          </div>
        </section>
      </main>

      <Footer pagename="about" />
    </>
  );
};

export default HowItWorks;
