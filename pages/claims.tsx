import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import Header from "../components/header";
import Footer from "../components/footer";
import { ArrowRightIcon } from "@heroicons/react/outline";

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
          <p className="text-center md:text-left font-paragraphs text-[#848484] text-base md:text-md leading-[18px] md:leading-[21px]">
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
                <h1 className="text-center md:text-left font-headings font-bold text-6xl leading-[53px]">
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

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-start justify-around md:space-x-24 flex flex-col space-y-14 md:flex-row md:space-y-0">
          <img className="" src="/img/claims-process.svg" alt="Claims Process" />

          <div className="flex flex-col space-y-4">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Here’s how we process your claim:
            </h2>
            <h3 className="font-headings font-bold text-2xl">Estimated Time to Settle (ETS)</h3>
            <div className="space-y-9">
              <p className="text-center md:text-left text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                This refers to the time it takes us to settle a claim from the time we receive notification complete
                with all required information and supporting documents. You can find the required documents for
                different types of claims at the section of thys page titled “Requirements”.
              </p>

              <div className="flex space-x-4 items-start">
                <p className="bg-primary-surface py-1.5 px-3 text-primary-main">1</p>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold font-headings">Minor Claims</h3>
                  <p className="text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                    (Claims with estimated cost up to Ghs5000) - 48 Hours
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start">
                <p className="bg-primary-surface py-1.5 px-3 text-primary-main">2</p>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold font-headings">Medium Claims</h3>
                  <p className="text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                    (Claims with estimated cost over Ghs5,000 and up to Ghs20,000) - 7 days
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start">
                <p className="bg-primary-surface py-1.5 px-3 text-primary-main">3</p>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold font-headings">Major Claims</h3>
                  <p className="text-[#848484] font-paragraphs text-xs md:text-base leading-tight">
                    (Claims with estimated cost over Ghs20,000) - 7 days
                  </p>
                </div>
              </div>

              <p className="text-center md:text-left text-[#8d8d8d] font-paragraphs text-xs leading-[14px]">
                ! Please note that the ETS may be affected by the timeliness of your responses to our requests for
                additional information. In all cases, we will make sure to keep you informed.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-primary-surface">
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-12 md:my-24 items-start justify-around flex flex-col space-y-14 md:space-y-0">
            <h2 className="font-headings font-bold text-center md:text-left text-2xl md:text-6xl leading-[32px] md:leading-[61px]">
              Process
            </h2>
            <div className="flex flex-col-reverse md:flex-row md:space-x-8 items-start">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4 items-start">
                  <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark">1</p>
                  <div className="flex flex-col">
                    <p className="font-paragraphs text-md leading-tight">
                      We send you an acknowledgement letter within 24 hours. The letter will let you know if we need any
                      additional information or evidence. We will also set out the processing timeline in the claim
                      acknowledgement letter so you’re not left in the dark.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4 items-start">
                  <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark">2</p>
                  <div className="flex flex-col">
                    <p className="font-paragraphs text-md leading-tight">
                      We investigate the claim and inform you if your claim is admissible. A claim is admissible if the
                      incident causing the claim is covered by the terms of your contract. For example, if you insure
                      your car against your liability to third parties, damage to your car by fire, and theft of your
                      car, you cannot make a claim if your car is damaged by flood.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4 items-start">
                  <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark">3</p>
                  <div className="flex flex-col">
                    <p className="font-paragraphs text-md leading-tight">
                      We adjust the claim cost and arrive at the settlement amount. In some cases, the estimate you
                      submit may be over-state or under-state the cost of some parts. In other instances, some listed
                      parts may not have been reasonably affected by the circumstances of the incident. We will send you
                      a letter and explain how we arrived at the settlement amount to you.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4 items-start">
                  <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark">4</p>
                  <div className="flex flex-col">
                    <p className="font-paragraphs text-md leading-tight">
                      Once you accept the settlement amount, we go ahead and pay you to have your car repaired. In some
                      cases, we may decide to settle your claim by appointing a repair shop to fix the damage to your
                      car. We will let you know if we decide to settle this way.
                    </p>
                  </div>
                </div>
                <p className="text-center md:text-left font-bold text-2xl leading-[31px]">
                  In processing your claim, we are guided by the ETS as noted above and we will do everything to stay
                  within the timelines.
                </p>
              </div>

              <img className="" src="/img/claim-process.svg" alt="Claims Process" />
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-8 sm:px-12 my-44 flex flex-col items-center justify-center space-y-10 md:space-y-44">
          <div className="flex flex-col space-y-36">
            <h2 className="text-center text-[30px] md:text-6xl font-headings font-bold md:leading-[61px]">
              Primary evidence and documents <br className="hidden md:flex" /> for different types of claims
            </h2>

            <div className="items-start justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Collision damage to your car
                </h2>
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">1</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Pictures and videos of the damage to your vehicle. Pictures must clearly show the damaged
                        portions of your car and videos must show your vehicle number, chassis number, and the damaged
                        portions.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">2</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Estimate of repair if you have one.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">3</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Copy of driver&apos;s license of the person who was driving at the time of the accident.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <img className="" src="/img/collission-damage.svg" alt="Collission Damage" />
            </div>

            <div className="items-center justify-around md:space-x-24 md:space-x-reverse flex flex-col-reverse space-y-10 space-y-reverse md:flex-row-reverse md:space-y-0">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Theft of your <br className="hidden md:flex" /> car
                </h2>

                <p className="text-center md:text-left text-[#848484] font-paragraphs text-md leading-tight">
                  Extract of report from the Police Station <br className="hidden md:flex" /> closest to the last
                  location of the vehicle <br className="hidden md:flex" /> before it was stolen.
                </p>
              </div>

              <img className="" src="/img/car-theft.svg" alt="Theft Of Your Car" />
            </div>

            <div className="items-center justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Flood damage to <br className="hidden md:flex" /> your car
                </h2>

                <p className="text-center md:text-left text-[#848484] font-paragraphs text-md leading-tight">
                  Report from the Fire Service. You simply need <br className="hidden md:flex" /> to make a report to
                  the nearest Fire Service <br className="hidden md:flex" /> Station and they would assess your vehicle
                  and <br className="hidden md:flex" /> issue a report.
                </p>
              </div>

              <img className="" src="/img/flood-damage.svg" alt="Flood Damage" />
            </div>

            <div className="items-center justify-around md:space-x-24 md:space-x-reverse flex flex-col-reverse space-y-10 space-y-reverse md:flex-row-reverse md:space-y-0">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Fire damage to <br className="hidden md:flex" /> your car
                </h2>

                <p className="text-center md:text-left text-[#848484] font-paragraphs text-md leading-tight">
                  Report from the Fire Service. You simply need <br className="hidden md:flex" /> to make a report to
                  the nearest Fire Service <br className="hidden md:flex" /> Station and they would assess your vehicle{" "}
                  <br className="hidden md:flex" /> and issue a report.
                </p>
              </div>

              <img className="" src="/img/fire-damage.svg" alt="Fire Damage" />
            </div>

            <div className="items-center justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Any other damage to <br className="hidden md:flex" /> your car
                </h2>

                <p className="text-center md:text-left text-[#848484] font-paragraphs text-md leading-tight">
                  Get in touch with us and would be happy to <br className="hidden md:flex" /> advise appropriately.
                  Whatsapp us on (+233) 201335141.
                </p>
              </div>

              <img className="" src="/img/any-damage.svg" alt="Any Damage" />
            </div>

            <div className="flex flex-col space-y-16 md:space-y-20">
              <h2 className="text-center text-[30px] md:text-6xl font-headings font-bold md:leading-[61px]">
                Damage to another person’s car or <br className="hidden md:flex" /> property
              </h2>

              <div className="items-center justify-around md:space-x-24 flex flex-col space-y-10 md:flex-row md:space-y-0">
                <img className="" src="/img/third-party-damage.svg" alt="Third Party Damage" />
                <div className="flex flex-col space-y-4 md:space-y-7">
                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">1</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Police report of the incident.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">2</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Estimate of repair of the person’s car
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">3</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Copy of the person who was driving your car at the time of the incident
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">4</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Copy of the driving license of the person who was driving the other car
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">5</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Pictures of the damage to the other person’s car
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">6</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Video of the damage to the other person’s car
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-center">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">7</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Pictures showing damage to your car even if your car is not <br className="hidden md:flex" />{" "}
                        insured against collision damage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="items-start justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row md:space-y-0">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Injury to you in an <br className="hidden md:flex" /> accident
                </h2>
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">1</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Police report of the incident.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">2</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Medical report from the hospital where you first reported after the incident, and report(s) from
                        other hospitals you visited subsequently
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">3</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        We may require an assessment of your injuries by our appointed medical doctor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <img className="" src="/img/collission-damage.svg" alt="Collission Damage" />
            </div>

            <div className="items-center justify-around md:space-x-24 flex flex-col-reverse space-y-10 space-y-reverse md:flex-row-reverse md:space-y-0 md:space-x-reverse">
              <div className="flex flex-col space-y-4 md:space-y-7">
                <h2 className="font-headings font-bold text-center md:text-left text-[30px] md:text-6xl leading-[32px] md:leading-[56px]">
                  Injury/death to other person(s) in an accident involving your car
                </h2>
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-[#848484] font-semibold">1</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Police report of the incident.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">2</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Medical report from the hospital where the person(s) first reported after the incident, and
                        report(s) from other hospitals you visited subsequently
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">3</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Copy of the driver’s license of the person who was driving your car at the time of the accident
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">4</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        Copy of the driver’s license of the person driving the other car in case the incident involved
                        another car.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 items-start">
                    <p className="bg-[#fbc02d1a] py-1.5 px-3 text-dark font-semibold">5</p>
                    <div className="flex flex-col">
                      <p className="text-[#848484] font-paragraphs text-md leading-tight">
                        We may require an assessment of their injuries by our appointed medical doctor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <img className="" src="/img/injury-by-accident.svg" alt="Collission Damage" />
            </div>

            <h2 className="text-center text-[30px] md:text-6xl font-headings font-semibold md:leading-[61px]">
              Giving you a great experience is core to our business. Whenever the long talk sounds like gibberish to
              you, whatsapp us 24/7 and we would be happy to assist - <br />
              <span className="text-primary-main">(+233) 201335141</span>
            </h2>
          </div>
        </section>
      </main>

      <Footer pagename="about" />
    </>
  );
};

export default Network;
