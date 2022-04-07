import { FC, useState } from "react";
import Link from "next/link";
import CookieNotice from "./cookie-notice";
import router from "next/router";
import { Modal } from "./modal";
import CheckPremium from "./check-premium";
import { XIcon } from "@heroicons/react/outline";
import Login from "./panel/login";

const Footer_New: FC<{}> = ({}) => {
  const [showQuoteForm, setShowQuoteForm] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  return (
    <footer className={`bg-dark px-7 py-16`}>
      <div className="flex flex-col md:flex-row-reverse space-y-28 md:space-y-0 md:w-3/4 mx-auto justify-between">
        <div className="w- text-white flex flex-col space-y-6">
          <h4 className="text-[20px] leading-[30px] text-primary-main">
            Reach us
          </h4>

          <div className="flex flex-col space-y-6 items-center justify-center">
            <Link href="mailto:team@brolly.africa" passHref>
              <a className="flex flex-row items-center space-x-4 text-white">
                <img className="w-5" src="/icons/mail_2.svg" alt="Message" />
                <p className="font-bold font-headings">hello@brolly.africa</p>
              </a>
            </Link>

            <Link href="tel:+233 201 819 581" passHref>
              <a className="flex flex-row items-center space-x-4 text-white">
                <img className="w-5" src="/icons/whatsapp.svg" alt="Message" />
                <p className="font-semibold font-headings">+233 201 819 581</p>
              </a>
            </Link>
          </div>
        </div>

        <div className="w- text-white flex flex-col space-y-6">
          <div className="flex flex-col items-center md:items-start justify-center">
            <Link href="/" passHref>
              <a>
                <img
                  className=""
                  src="/img/logo-white.svg"
                  alt="Logo Footer"
                />
              </a>
            </Link>
          </div>

          <div className="space-y-16">
            <div className="flex flex-row items-center justify-center space-x-2">
              <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
                <Link href="https://www.facebook.com/Brolly.insure/" passHref>
                  <a target="_blank">
                    <img
                      className=""
                      src="/icons/facebook.svg"
                      alt="Facebook Page Link"
                    />
                  </a>
                </Link>
              </div>

              <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
                <Link
                  href="https://www.linkedin.com/company/brolly-insure"
                  passHref
                >
                  <a target="_blank">
                    <img
                      className=""
                      src="/icons/linkedin.svg"
                      alt="LinkedIn Page Link"
                    />
                  </a>
                </Link>
              </div>

              <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
                <Link href="https://twitter.com/Brolly_insure" passHref>
                  <a target="_blank">
                    <img
                      className=""
                      src="/icons/twitter.svg"
                      alt="Twitter Page Link"
                    />
                  </a>
                </Link>
              </div>

              <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
                <Link href="https://instagram.com/brolly_insure" passHref>
                  <a target="_blank">
                    <img
                      className=""
                      src="/icons/instagram.svg"
                      alt="Instagram Page Link"
                    />
                  </a>
                </Link>
              </div>

              <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
                <Link href="https://vm.tiktok.com/ZM8tP4mVH/" passHref>
                  <a target="_blank">
                    <img
                      className=""
                      src="/icons/tiktok.svg"
                      alt="TikTok Page Link"
                    />
                  </a>
                </Link>
              </div>

              {/* <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link
                href="https://www.youtube.com/channel/UCQ1mPDIOo2u8Vp8aKOIFd4A"
                passHref
              >
                <a target="_blank">
                  <img
                    className=""
                    src="/icons/youtube.svg"
                    alt="Youtube Page Link"
                  />
                </a>
              </Link>
            </div> */}
            </div>

            <div className="flex flex-row items-center md:justify-start justify-center space-x-4 text-white">
              <p className="text-xs flex">
                &copy; 2022 Brolly. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer_New;
