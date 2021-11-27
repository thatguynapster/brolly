import type { NextPage } from "next";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";

const About: NextPage = () => {
  return (
    <>
      <HeadFile title={SEOConfig.title} />
      <Header />
      <main className="bg-white flex flex-col justify-center items-center">
        <section className="h-screen w-full max-w-7xl mx-auto px-8 sm:px-12 flex flex-col  space-y-10 md:space-y-8">
          <h1 className="text-center md:text-left text-[30px] md:text-7xl font-headings font-bold leading-[38px]md:leading-[96px]">
            We’re on a mission to <br className="flex md:hidden" /> change <br className="hidden md:flex" /> insurance
            in <br className="flex md:hidden" /> Africa for good.
          </h1>
          <div className="md:relative w-full bg-primary-surface h-[361px] md:h-[552px] px-7 md:px-0 pt-7 md:pt-3 space-y-4 md:items-center md:flex md:flex-col">
            <img className="w-full md:px-7 max-w-3xl" src="/img/coworking.svg" alt="Main Illustration" />
            <div className="md:absolute left-0 bottom-[-182px] md:w-5/12 w-full bg-primary-main px-5 py-6 flex flex-col items-center md:items-start justify-center space-y-4">
              <p className="text-center md:text-left text-white text-xs md:text-md">
                We believe insurance is a force for good in the world. Just like you, we believe insurance service
                delivery has some real catching up to do in Africa. We&apos;ve been around the world and seen insurance
                work differently elsewhere. We keep asking ourselves why it cannot be done in Africa. Together, we can
                make insurance work as we desire.
              </p>
              <button className="whitespace-nowrap text-base font-medium text-primary-main bg-dark py-4 px-6 border-0 shadow-sm">
                Join us
              </button>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-end justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-4 md:space-y-9">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Change is our business
            </h2>
            <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
              Far from selling insurance, we are driven by the need for a different experience. You can see us as
              rebels, non-conformists, or just those cool guys who take a day off work each month to do good in our
              world.
            </p>
            <p className="text-center md:text-left text-[#848484] font-paragraphs font-bold text-xs md:text-base leading-tight">
              Want to know more about us?
            </p>

            <button className="hidden w-max md:flex whitespace-nowrap text-base font-medium bg-primary-main py-4 px-6 border-0 shadow-sm">
              Connect with us
            </button>
          </div>

          <img className="" src="/img/self-confidence.svg" alt="No Pranks" />
        </section>

        <section className="w-full max-w-7xl mx-auto px-24 mb-14 flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="border border-[#E0E0E0] px-16 py-12">
              <img className="w-full" src="/icons/instagram-dark.svg" alt="Connect on Instagram" />
            </div>

            <div className="border border-[#E0E0E0] px-16 py-12">
              <img className="w-full" src="/icons/twitter-dark.svg" alt="Connect on Twitter" />
            </div>

            <div className="border border-[#E0E0E0] px-16 py-12">
              <img className="w-full" src="/icons/facebook-dark.svg" alt="Connect on Facebook" />
            </div>

            <div className="border border-[#E0E0E0] px-16 py-12">
              <img className="w-full" src="/icons/linkedin-dark.svg" alt="Connect on LinkedIn" />
            </div>

            <div className="border border-[#E0E0E0] px-16 py-12">
              <img className="w-full" src="/icons/tiktok-dark.svg" alt="Connect on TikTok" />
            </div>
          </div>
        </section>
      </main>

      <Footer pagename="about" />
    </>
  );
};

export default About;
