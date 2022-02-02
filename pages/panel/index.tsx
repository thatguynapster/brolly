import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import HeadFile from "../../components/head-file";
import { SEOConfig } from "../../configs/global_variables";

import Layout from "../../components/panel/layout";
import AuthContext from "../../context/auth-context";
import { useRouter } from "next/router";
import QuotesView from "../../components/panel/quotes-view";

const PanelHome: NextPage = () => {
  const [pageSection, setPageSection] = useState<string>("login"); // login | vehicle_verify | vehicle_details | panel

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    console.log(GLOBAL_OBJ);
    !GLOBAL_OBJ.isLoggedIn && router.push("./login");

    return () => {
      mounted = false;
    };
  }, [GLOBAL_OBJ]);

  return (
    <>
      <HeadFile title={SEOConfig.title} />
      {/* <Header pagename="claims" /> */}
      <main className={`min-h-screen flex items-center justify-center`}>
        <Layout onRefresh={() => {}}>
          <QuotesView show={GLOBAL_OBJ.currentPage === "quotes"} />
        </Layout>

        {/* verify vehicle details section */}
        {/* <Transition
          as={Fragment}
          show={pageSection === "vehicle_verify"}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="max-w-6xl w-full space-y-12 py-12 px-4 sm:px-6 lg:px-8">
            <img className=" h-12 w-auto" src="/img/logo.svg" alt="Brolly Logo" />
            <div className="flex flex-row">
              <div className="w-3/4 space-y-6">
                <div>
                  <p className="font-paragraphs">Welcome Andrew,</p>
                  <p className="font-paragraphs">Please check the details of your quote and confirm.</p>
                </div>
                <form
                  action="#"
                  method="post"
                  className="space-y-4"
                  onSubmit={(ev: any) => {
                    ev.preventDefault();
                    setPageSection("vehicle_details");
                  }}
                >
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="vehicleType" className="w-max">
                      Type of Vehicle
                    </label>
                    <input
                      id="vehicleType"
                      name="vehicleType"
                      type="text"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="TYPE_OF_VEHICLE"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="manufactureYear" className="w-max">
                      Year of Manufacture
                    </label>
                    <input
                      id="manufactureYear"
                      name="manufactureYear"
                      type="text"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="YEAR_OF_VEHICLE"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="vehicleMileage" className="w-max">
                      Usage
                    </label>
                    <input
                      id="vehicleMileage"
                      name="vehicleMileage"
                      type="number"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="VEHICLE_MILEAGE"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="passengerCount" className="w-max">
                      No of Passengers
                    </label>
                    <input
                      id="passengerCount"
                      name="passengerCount"
                      type="text"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="NO_OF_PASSENGERS"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="manufactureYear" className="w-max">
                      Initial Deposit
                    </label>
                    <input
                      id="manufactureYear"
                      name="manufactureYear"
                      type="number"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="INITIAL_DEPOSIT"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="monthlyInstallments" className="w-max">
                      Monthly Installments
                    </label>
                    <input
                      id="monthlyInstallments"
                      name="monthlyInstallments"
                      type="number"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="MONTHLY_INSTALLMENTS"
                    />
                  </div>

                  <button className="bg-primary-main py-3 px-4 font-semibold justify-end space-x-4">Confirm</button>
                </form>
              </div>
              <div className="w-1/4"></div>
            </div>
          </div>
        </Transition> */}
        {/* END Verify vehicle details section */}

        {/* Vehicle extra details section */}
        {/* <Transition
          as={Fragment}
          show={pageSection === "vehicle_details"}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="max-w-6xl w-full space-y-12 py-12 px-4 sm:px-6 lg:px-8">
            <img className=" h-12 w-auto" src="/img/logo.svg" alt="Brolly Logo" />
            <div className="flex flex-row">
              <div className="w-3/4 space-y-6">
                <div>
                  <p className="font-paragraphs"> Please enter the following details. </p>
                </div>
                <form
                  action="#"
                  method="post"
                  className="space-y-4"
                  onSubmit={(ev: any) => {
                    ev.preventDefault();
                    setPageSection("vehicle_details");
                  }}
                >
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="vehicleRegNumber" className="w-max">
                      Vehicle Registration Number
                    </label>
                    <input
                      id="vehicleRegNumber"
                      name="vehicleRegNumber"
                      type="text"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="VEHICLE_REG_NUMBER"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="chassisNumber" className="w-max">
                      Chassis Number
                    </label>
                    <input
                      id="chassisNumber"
                      name="chassisNumber"
                      type="text"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="CHASSIS_NUMBER"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="vehicleMake" className="w-max">
                      Make of Vehicle
                    </label>
                    <input
                      id="vehicleMake"
                      name="vehicleMake"
                      type="number"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="VEHICLE_MAKE"
                    />
                  </div>

                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="vehicleModel" className="w-max">
                      Model
                    </label>
                    <input
                      id="vehicleModel"
                      name="vehicleModel"
                      type="text"
                      className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                      placeholder="VEHICLE_MODEL"
                    />
                  </div>

                  <button className="bg-primary-main py-3 px-4 font-semibold justify-end space-x-4"> Proceed </button>
                </form>
              </div>
              <div className="w-1/4"></div>
            </div>
          </div>
        </Transition> */}
        {/* END Vehicle extra details section */}

        {/* Go to payment screen from previous screen */}
      </main>
    </>
  );
};

export default PanelHome;
