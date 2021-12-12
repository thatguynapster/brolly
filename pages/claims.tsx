import type { NextPage } from "next";
import Link from "next/link";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";

const Network: NextPage = () => {
  return (
    <>
      <HeadFile title={SEOConfig.title} />
      <Header />
      <main className="bg-white flex flex-col justify-center items-center">
        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 flex flex-col space-y-4">
          <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold leading-[38px]md:leading-[96px]">
            No Pranks, No IFs, <br /> No BUTs
          </h1>
          <p className="text-center md:text-left font-paragraphs text-[#848484] text-xs md:text-md leading-[14px] md:leading-[21px]">
            Think...a faulty parachute when your flight has an emergency? So why would you accept an insurance contract
            that leaves you headaches?
          </p>
          <div className="w-full bg-primary-surface py-10 flex items-center justify-center">
            <img className="w-full max-w-3xl" src="/img/no-pranks_2.svg" alt="Main Illustration" />
          </div>
        </section>

        <section className="w-full max-w-7xl mt-24 mx-auto px-8 sm:px-12 my-8 flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-5 space-y-8 md:space-y-0 md:space-x-11">
            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-center">
                <h1 className="font-headings font-bold text-6xl leading-[53px]">
                  Here&apos;s how to make a claim on your Brolly Car:
                </h1>
              </div>
            </div>

            <div className="flex flex-col">
              <h4 className="font-headings font-semibold text-lg leading-[25px]">Step 1</h4>
              <p className="text-base text-[#848484] leading-[27px] font-paragraphs">
                Login to your Brolly account on{" "}
                <Link href="https://brollyinsurance.com" passHref>
                  <a className="font-bold" href="#">
                    brollyinsurance.com
                  </a>
                </Link>
                . Alternatively, you could initiate a whatsapp chat with us on{" "}
                <Link href="tel:(+233) 201335141" passHref>
                  <a className="font-bold" href="#">
                    (+233) 201335141
                  </a>
                </Link>
                and select the option to make a claim.
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className="font-headings font-semibold text-lg leading-[25px]">Step 2</h4>
              <p className="text-base text-[#848484] leading-[27px] font-paragraphs">
                Provide us details of your incident and the type of claimProvide us details of your incident and the
                type of claim
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className="font-headings font-semibold text-lg leading-[25px]">Step 3</h4>
              <p className="text-base text-[#848484] leading-[27px] font-paragraphs">
                Upload pictures and videos of the accident vehicle
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className="font-headings font-semibold text-lg leading-[25px]">Step 4</h4>
              <p className="text-base text-[#848484] leading-[27px] font-paragraphs">
                All done! Your claim is with us.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer pagename="about" />
    </>
  );
};

export default Network;
