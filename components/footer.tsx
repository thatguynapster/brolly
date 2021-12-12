import { FC } from "react";
import Link from "next/link";
import CookieNotice from "./cookie-notice";

const Footer: FC<{ pagename: string }> = ({ pagename }) => {
  return (
    <footer className={`bg-dark px-7 py-16 mb-[74px] md:mb-0`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row space-y-16 md:space-y-0">
        <div className="w-full md:w-2/3 text-white flex flex-col space-y-10">
          <div className="space-y-3">
            <Link href="/" passHref>
              <a>
                <img className="w-1/4 md:w-1/12" src="/img/logo-footer.svg" alt="Logo Footer" />
              </a>
            </Link>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col space-y-6">
                <Link href="/who-we-are" passHref>
                  <a className="mr-3" href="#">
                    Who we are
                  </a>
                </Link>
                <Link href="/network" passHref>
                  <a href="#">Brolly Network</a>
                </Link>
                <Link href="/claims" passHref>
                  <a href="#">Claims</a>
                </Link>
                <Link href="/legal?section=faq" passHref>
                  <a href="#">FAQs</a>
                </Link>
              </div>

              <div className="flex flex-col space-y-6">
                <Link href="/legal?section=privacy" passHref>
                  <a href="#">Privay Policy</a>
                </Link>
                <Link href="/legal?section=tos" passHref>
                  <a href="#">Terms &amp; Conditions</a>
                </Link>
                <Link href="/legal?section=cookies" passHref>
                  <a href="#">Cookies Policy</a>
                </Link>
              </div>
            </div>
          </div>

          <p className="text-small mt-8 hidden md:flex"> &copy; 2021 Brolly. All rights reserved</p>
        </div>

        <div className="w-full md:w-1/3 text-white flex flex-col space-y-6">
          <h4 className="text-[20px] leading-[30px] text-white">Reach us</h4>

          <Link href="mailto:team@brollyinsurance.com" passHref>
            <a className="flex flex-row items-center space-x-4 text-white">
              <img className="w-5" src="/icons/mail.svg" alt="Message" />
              <p className="font-semibold font-headings text-sm">team@brollyinsurance.com</p>
            </a>
          </Link>

          <Link href="tel:+233 201 335 141" passHref>
            <a className="flex flex-row items-center space-x-4 text-white">
              <img className="w-5" src="/icons/phone.svg" alt="Message" />
              <p className="font-semibold font-headings text-sm">+233 201 335 141</p>
            </a>
          </Link>

          <div className="flex flex-row items-center space-x-4 text-white">
            <img className="w-5" src="/icons/location.svg" alt="Message" />
            <p className="font-semibold font-headings text-sm">
              No. 19 Kofi Annan Street, Airport <br />
              Residential Area. Accra, Ghana
            </p>
          </div>

          <div className="flex flex-row space-x-2">
            <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link href="https://instagram.com/brolly_insure" passHref>
                <a target="_blank">
                  <img className="" src="/icons/instagram.svg" alt="Instagram Page Link" />
                </a>
              </Link>
            </div>

            <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link href="https://twitter.com/Brolly_insure" passHref>
                <a target="_blank">
                  <img className="" src="/icons/twitter.svg" alt="Twitter Page Link" />
                </a>
              </Link>
            </div>

            <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link href="https://www.facebook.com/Brolly.insure/" passHref>
                <a target="_blank">
                  <img className="" src="/icons/facebook.svg" alt="Facebook Page Link" />
                </a>
              </Link>
            </div>

            <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link href="https://www.linkedin.com/company/brolly-insur" passHref>
                <a target="_blank">
                  <img className="" src="/icons/linkedin.svg" alt="LinkedIn Page Link" />
                </a>
              </Link>
            </div>

            <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link href="https://vm.tiktok.com/ZM8tP4mVH/" passHref>
                <a target="_blank">
                  <img className="" src="/icons/tiktok.svg" alt="TikTok Page Link" />
                </a>
              </Link>
            </div>

            <div className="rounded-full p-2 bg-gray-800 w-10 h-10">
              <Link href="https://www.youtube.com/channel/UCQ1mPDIOo2u8Vp8aKOIFd4A" passHref>
                <a target="_blank">
                  <img className="" src="/icons/youtube.svg" alt="Youtube Page Link" />
                </a>
              </Link>
            </div>

            {/* <Link href="https://twitter.com/Brolly_insure" passHref>
              <a target="_blank" className="mr-3">
                <img className="w-8 h-8 m-2" src="/icons/twitter.svg" alt="Twitter Link" />
              </a>
            </Link>
            <Link href="https://www.youtube.com/channel/UCQ1mPDIOo2u8Vp8aKOIFd4A" passHref>
              <a target="_blank" className="mr-3">
                <img className="w-8 h-8 m-2" src="/icons/youtube.svg" alt="Youtube Link" />
              </a>
            </Link> */}
          </div>
        </div>

        <div className="flex flex-row items-center space-x-4 text-white">
          <p className="text-small md:hidden flex"> &copy; 2021 Brolly. All rights reserved</p>
        </div>
      </div>

      {/* should stick to bottom of page in mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
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
      <CookieNotice />
    </footer>
  );
};

export default Footer;
