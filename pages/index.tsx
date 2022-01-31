import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import FormGroup from "../components/form-group";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import ListBox from "../components/list-box";
import Footer from "../components/footer";
import CookieNotice from "../components/cookie-notice";
import { ArrowRightIcon, CheckCircleIcon, CheckIcon } from "@heroicons/react/outline";
import CheckPremium from "../components/check-premium";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import JoinWaitlist from "../components/join-waitlist";
import { Modal } from "../components/modal";
import InternationalInput from "../components/international-input";
import { toast } from "react-toastify";
import { mkPostReq, validateEmail } from "../utils/functions";
import AuthContext from "../context/auth-context";

const Home: NextPage = () => {
  const [basePath, setBasePath] = useState<string | null>(null);

  const [showPremiumRequestModal, setShowPremiumRequestModal] = useState<boolean>(false);
  const [showPremiumRequestResponseModal, setShowPremiumRequestResponseModal] = useState<boolean>(false);

  const [premiumData, setPremiumData] = useState<any>({});
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [whatsappNumberValid, setWhatsappNumberValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string>("");
  const [howYouHeard, setHowYouHeard] = useState<string>("");

  const [dialCode, setDialCode] = useState<string>("");

  const { GLOBAL_OBJ } = useContext(AuthContext);

  async function _handlePhoneNumber(field: string, value: string, isValid: boolean, dial_code: string) {
    setWhatsappNumberValid(isValid);
    setWhatsappNumber(String(value.split("+").pop()));
    console.log(dial_code);
    setDialCode(dial_code);
  }

  const _handleCoverRequest = async () => {
    if (firstname === "") {
      toast.error("Enter your first name");
      return;
    }
    if (lastname === "") {
      toast.error("Enter your last name");
      return;
    }
    if (!whatsappNumberValid) {
      toast.error("Provide a valid phone number");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (vehicleMake === "") {
      toast.error("Provide your vehicle make");
      return;
    }
    if (vehicleModel === "") {
      toast.error("Provide your vehicle model");
      return;
    }

    let premium_request_data = {
      email: email,
      firstName: firstname,
      lastName: lastname,
      makeOfVehicle: `${vehicleMake} - ${vehicleModel}`,
      phoneNumber: whatsappNumber.replace(dialCode, ""),
      countryInfoId: 1,
      vehicleType: "<string>",
      vehicleUse: "<string>",
      vehicleValue: "<long>",
      reference: howYouHeard,
      ...premiumData,
    };

    console.log(premiumData);
    console.log(premium_request_data);

    try {
      let create_insurance_response = await mkPostReq({
        endpoint: `/api/insurances/create`,
        method: "post",
        data: JSON.stringify(premium_request_data),
        isJSON: true,
        token: GLOBAL_OBJ.token,
      });
      console.log(create_insurance_response);

      if (create_insurance_response.httpStatus) {
        toast.error(create_insurance_response.message);
      } else {
        setShowPremiumRequestModal(false);
        setShowPremiumRequestResponseModal(true);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
    }
  };

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

            <CheckPremium
              onRequestCover={(_data) => {
                console.log(_data);
                setPremiumData(_data);
                setShowPremiumRequestModal(true);
              }}
            />
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-8 flex flex-col items-center justify-center space-y-16 md:space-y-24">
          <div className="flex flex-col items-center space-y-12 md:space-y-8" id="joinWaitlist">
            <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
              Launching in Jan 2022 <img className="w-10 inline-flex" src="/img/ghana.jpg" alt="Ghana" />. Join our
              waitlist!
            </h2>
            <p className="max-w-2xl text-center font-paragraphs text-[#848484] text-base md:text-md leading-[20px] md:leading-[24px]">
              Register your interest to join our take-off 🚀 in January. Guaranteed deals and gifts for first 1000
              people on our waitlist.
            </p>
            <MailchimpSubscribe
              url={`${process.env.NEXT_PUBLIC_MAILCHIMP_URL}?u=${process.env.NEXT_PUBLIC_MAILCHIMP_U}&id=${process.env.NEXT_PUBLIC_MAILCHIMP_ID}`}
              render={({ subscribe, status, message }) => (
                <>
                  <JoinWaitlist status={status} message={message} onValidated={(formData) => subscribe(formData)} />
                </>
              )}
            />
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

        <Modal
          show={showPremiumRequestModal}
          onClose={() => {
            setShowPremiumRequestModal(false);
          }}
        >
          <div className="px-4 py-8 space-y-8">
            <h1 className="text-md font-semibold text-center">
              Please provide these details to complete your request.
            </h1>

            <div className="flex flex-row items-center space-x-8">
              <hr className="w-full" />
              <h2 className="w-full">Personal Details</h2>
              <hr className="w-full" />
            </div>

            <div className="space-y-4">
              <div className="flex flex-row space-x-4">
                <FormGroup
                  type="text"
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                  value={firstname}
                  onValueChanged={(_val: any) => {
                    setFirstname(_val.target.value);
                  }}
                  onFocusOut={(_val: any) => {
                    setFirstname(_val.target.value);
                  }}
                />

                <FormGroup
                  type="text"
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                  value={lastname}
                  onValueChanged={(_val: any) => {
                    setLastName(_val.target.value);
                  }}
                  onFocusOut={(_val: any) => {
                    setLastName(_val.target.value);
                  }}
                />
              </div>

              <InternationalInput
                firstLoad
                className={`appearance-none relative block w-full py-3 px-4 border placeholder-[#848484] bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm`}
                label={{
                  classNames: "w-full text-swooveGray-caption p-0 mb-1 font-medium text-xs",
                  text: "Whatsapp Number",
                }}
                name={"phoneNumber"}
                defaultValue={whatsappNumber}
                defaultCountry={"gh"}
                onValueChange={_handlePhoneNumber}
                disabled={false}
                autoFocus={false}
              />

              <FormGroup
                type="email"
                id="email"
                label="Email"
                placeholder="Eg: someone@mail.com"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={email}
                onValueChanged={(_val: any) => {
                  setEmail(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setEmail(_val.target.value);
                }}
              />
            </div>

            <div className="flex flex-row items-center space-x-8">
              <hr className="w-full" />
            </div>

            <ListBox
              className="bg-[#101d490d] border-none"
              id="vehicle_type_of_use"
              values={[
                {
                  name: "",
                  value: "How did you hear about us?",
                  id: "0",
                },
                {
                  name: "FACEBOOK_INSTAGRAM",
                  value: "Facebook/Instagram",
                  id: "1",
                },
                {
                  name: "GOOGLE_WEB",
                  value: "Google/Web",
                  id: "2",
                },
                {
                  name: "LINKEDIN",
                  value: "LinkedIn",
                  id: "3",
                },
                {
                  name: "TWITTER",
                  value: "Twitter",
                  id: "4",
                },
                {
                  name: "Word_of_mouth",
                  value: "Word of Mouth",
                  id: "5",
                },
                {
                  name: "FLIER",
                  value: "Flier",
                  id: "6",
                },
                {
                  name: "BILLBOARD",
                  value: "Billboard",
                  id: "7",
                },
                {
                  name: "NEWSPAPER_AD",
                  value: "Newspaper Ad",
                  id: "8",
                },
                {
                  name: "RADIO",
                  value: "Radio",
                  id: "9",
                },
              ]}
              selected={{
                name: "",
                value: "How did you hear about us?",
                id: "0",
              }}
              onValueChange={(_type: any) => {
                // console.log(_type);
                setHowYouHeard(_type);
              }}
            />

            <div className="flex flex-row items-center space-x-8">
              <hr className="w-full" />
              <h2 className="w-full">Vehicle Details</h2>
              <hr className="w-full" />
            </div>

            <div className="space-y-4">
              <FormGroup
                type="text"
                id="vehicleMake"
                label="Vehicle Make"
                placeholder="Eg: Mercedes"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={vehicleMake}
                onValueChanged={(_val: any) => {
                  setVehicleMake(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleMake(_val.target.value);
                }}
              />

              <FormGroup
                type="text"
                id="vehicleModel"
                label="Vehicle Model"
                placeholder="Eg: C350"
                className="bg-[#101d490d] rounded-[0px] border-none placeholder-[#848484] focus:ring-primary-border"
                value={vehicleModel}
                onValueChanged={(_val: any) => {
                  setVehicleModel(_val.target.value);
                }}
                onFocusOut={(_val: any) => {
                  setVehicleModel(_val.target.value);
                }}
              />
            </div>

            <button
              className="w-full whitespace-nowrap text-base font-medium text-dark bg-primary-main py-2 px-4 border-0 shadow-sm flex justify-center items-center space-x-4"
              onClick={_handleCoverRequest}
            >
              <span> Proceed </span>
            </button>
          </div>
        </Modal>

        <Modal
          show={showPremiumRequestResponseModal}
          onClose={() => {
            setShowPremiumRequestResponseModal(false);
          }}
        >
          <div className="flex flex-col px-4 py-8 space-y-8 items-center">
            <CheckCircleIcon className="text-success-main w-48 h-48" />
            <h2 className="text-center font-semibold text-md">
              Insurance premium successfully requested. A representative will be in touch soon.
            </h2>
            <button
              className="bg-primary-main px-4 py-2"
              onClick={() => {
                setShowPremiumRequestResponseModal(false);
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      </main>

      <Footer pagename="home" />
    </>
  );
};

export default Home;
