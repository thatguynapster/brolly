import React, { FC, useEffect, useState } from "react";
import HeadFile from "../components/head-file";
import Header from "../components/header";
import Footer from "../components/footer";
import { SEOConfig } from "../configs/global_variables";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import FAQ from "../components/faq";
import TOS from "../components/tos";
import { getQuery } from "../utils/functions";
import PrivacyPolicy from "../components/privacy-policy";
import CookiesPolicy from "../components/cookies-policy";

const Legal: FC = () => {
  const [basePath, setBasePath] = useState<string | null>(null);
  interface activeSectionProps {
    type: "faq" | "tos" | "cookies" | "privacy";
  }

  const [activeSection, setActiveSection] = useState<string>("faq"); // faq | tos | cookies | privacy
  const [nextSection, setNextSection] = useState<string>("");

  useEffect(() => {
    console.log(window.location.href);
    // get page endpoint
    let endpoint = getQuery("section");
    console.log(endpoint);
    if (endpoint && endpoint !== "") {
      setActiveSection("");
      setNextSection(endpoint);
    }
    setBasePath(window.location.origin);
  }, []);

  return (
    <>
      <HeadFile title={SEOConfig.title} canonical={`${basePath}/legal`} />
      <Header pagename="legal" />
      <div className="max-w-7xl mt-16 px-4 sm:px-6 pb-16 mx-auto text-justify">
        <div className="z-10 flex md:hidden items-center whitespace-nowrap overflow-x-auto scrollbar-gray w-full text-gray-900 font-normal text-sm space-x-6">
          <a
            // key={i}
            href={"_lnk.slug"}
            onClick={(ev) => {
              ev.preventDefault();
              setNextSection("faq");
              setActiveSection("");
            }}
            className={`my-auto ${
              activeSection === "faq" ? "border-b-2 border-primary-main font-semibold text-primary-main" : ""
            } py-2`}
          >
            FAQ
          </a>

          <a
            // key={i}
            href={"_lnk.slug"}
            onClick={(ev) => {
              ev.preventDefault();
              setNextSection("tos");
              setActiveSection("");
            }}
            className={`my-auto ${
              activeSection === "tos" ? "border-b-2 border-primary-main font-semibold text-primary-main" : ""
            } py-2`}
          >
            Terms of Service
          </a>

          <a
            // key={i}
            href={"_lnk.slug"}
            onClick={(ev) => {
              ev.preventDefault();
              setNextSection("privacy");
              setActiveSection("");
            }}
            className={`my-auto ${
              activeSection === "privacy" ? "border-b-2 border-primary-main font-semibold text-primary-main" : ""
            } py-2`}
          >
            Privacy Policy
          </a>

          <a
            // key={i}
            href={"_lnk.slug"}
            onClick={(ev) => {
              ev.preventDefault();
              setNextSection("cookies");
              setActiveSection("");
            }}
            className={`my-auto ${
              activeSection === "cookies" ? "border-b-2 border-primary-main font-semibold text-primary-main" : ""
            } py-2`}
          >
            Cookie Policy
          </a>
        </div>
        <div className="flex md:divide-x-2 md:divide-gray-100">
          <div className="min-w-[275px] hidden md:flex pr-8 sticky top-0">
            <div className="w-full">
              <nav>
                <ul className="space-y-2 group">
                  <li
                    className={`${
                      activeSection === "faq"
                        ? "bg-primary-main text-dark"
                        : "bg-white text-gray-400 hover:bg-primary-surface hover:text-gray-700"
                    }  py-2 cursor-pointer px-3 font-semibold flex flex-row items-center space-x-4`}
                    onClick={() => {
                      setNextSection("faq");
                      setActiveSection("");
                      console.log(`active: ${activeSection}; next: ${nextSection}`);
                    }}
                  >
                    <span>FAQ</span>
                  </li>

                  <li
                    className={`${
                      activeSection === "tos"
                        ? "bg-primary-main text-dark"
                        : "bg-white text-gray-400 hover:bg-primary-surface hover:text-gray-700"
                    }  py-2 cursor-pointer px-3 font-semibold flex flex-row items-center space-x-4`}
                    onClick={() => {
                      setNextSection("tos");
                      setActiveSection("");
                      console.log(`active: ${activeSection}; next: ${nextSection}`);
                    }}
                  >
                    <span>Terms of Service</span>
                  </li>

                  <li
                    className={`${
                      activeSection === "privacy"
                        ? "bg-primary-main text-dark"
                        : "bg-white text-gray-400 hover:bg-primary-surface hover:text-gray-700"
                    }  py-2 cursor-pointer px-3 font-semibold flex flex-row items-center space-x-4`}
                    onClick={() => {
                      setNextSection("privacy");
                      setActiveSection("");
                      console.log(`active: ${activeSection}; next: ${nextSection}`);
                    }}
                  >
                    <span>Privacy Policy</span>
                  </li>

                  <li
                    className={`${
                      activeSection === "cookies"
                        ? "bg-primary-main text-dark"
                        : "bg-white text-gray-400 hover:bg-primary-surface hover:text-gray-700"
                    }  py-2 cursor-pointer px-3 font-semibold flex flex-row items-center space-x-4 rounded-md `}
                    onClick={() => {
                      setNextSection("cookies");
                      setActiveSection("");
                      console.log(`active: ${activeSection}; next: ${nextSection}`);
                    }}
                  >
                    <span>Cookies Policy</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="w-full md:pl-8">
            <Transition
              as={"div"}
              className="w-full mt-4 md:mt-0 mx-auto"
              show={activeSection === "faq"}
              enter="transform transition ease-out duration-250"
              enterFrom="opacity-10"
              enterTo="opacity-100"
              leave="transform transition ease-in duration-250"
              leaveFrom="opacity-90"
              leaveTo="opacity-0"
              afterLeave={() => {
                setActiveSection(nextSection);
                setNextSection("");
              }}
            >
              <FAQ />
            </Transition>

            <Transition
              as={"div"}
              className="w-full mt-4 md:mt-0 mx-auto"
              show={activeSection === "tos"}
              enter="transform transition ease-out duration-250"
              enterFrom="opacity-10"
              enterTo="opacity-100"
              leave="transform transition ease-in duration-250"
              leaveFrom="opacity-90"
              leaveTo="opacity-0"
              afterLeave={() => {
                setActiveSection(nextSection);
                setNextSection("");
              }}
            >
              <TOS />
            </Transition>

            <Transition
              as={"div"}
              className="w-full mt-4 md:mt-0 mx-auto"
              show={activeSection === "privacy"}
              enter="transform transition ease-out duration-250"
              enterFrom="opacity-10"
              enterTo="opacity-100"
              leave="transform transition ease-in duration-250"
              leaveFrom="opacity-90"
              leaveTo="opacity-0"
              afterLeave={() => {
                setActiveSection(nextSection);
                setNextSection("");
              }}
            >
              <PrivacyPolicy />
            </Transition>

            <Transition
              as={"div"}
              className="w-full mt-4 md:mt-0 mx-auto"
              show={activeSection === "cookies"}
              enter="transform transition ease-out duration-250"
              enterFrom="opacity-10"
              enterTo="opacity-100"
              leave="transform transition ease-in duration-250"
              leaveFrom="opacity-90"
              leaveTo="opacity-0"
              afterLeave={() => {
                setActiveSection(nextSection);
                setNextSection("");
              }}
            >
              <CookiesPolicy />
            </Transition>
          </div>
        </div>
      </div>

      <Footer pagename="legal" />
    </>
  );
};

export default Legal;
