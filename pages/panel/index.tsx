import React, { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import HeadFile from "../../components/head-file";
import { SEOConfig } from "../../configs/global_variables";

import { EyeIcon, LockClosedIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { getQuery, mkPostReq } from "../../utils/functions";
import InternationalInput from "../../components/international-input";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";

const Network: NextPage = () => {
  const [loginSection, setLoginSection] = useState<string>("login"); // login | reset
  const [pageSection, setPageSection] = useState<string>("login"); // login | vehicle_verify | vehicle_details

  const [showPasss, setShowPass] = useState<boolean>(false); // password | text
  const [showConfPass, setShowConfPass] = useState<boolean>(false);

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  // login form values
  const [phone, setPhone] = useState<string>("");
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext);

  async function _handlePhoneNumber(field: string, value: string, isValid: boolean) {
    setPhoneValid(isValid);
    setPhone(String(value.split("+").pop()));
  }

  const _handleLogin = async () => {
    //check if fields are filled
    if (!phoneValid) {
      toast.error("Please provide a valid phone number");
      return;
    }
    if (isNewUser && otp === "") {
      toast.error("Enter otp code");
      return;
    }

    if (!isNewUser && password === "") {
      toast.error("Provide your password");
      return;
    }

    console.log({ phone, otp, password });

    //hit login api
    try {
      let login_response = await mkPostReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/authenticate`,
        method: "post",
        data: {
          password: isNewUser ? otp : password,
          phoneNumber: phone,
          rememberMe: "false",
        },
        isJSON: true,
      });
      console.log(login_response);
    } catch (error) {
      toast.error("Login Failed");
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    let is_new = getQuery("new_user");
    setIsNewUser(Boolean(is_new === "true"));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <HeadFile title={SEOConfig.title} />
      {/* <Header pagename="claims" /> */}
      <main className={`h-screen flex items-center justify-center`}>
        <Transition
          as={Fragment}
          show={pageSection === "login"}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="max-w-md w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8 mx-4 border border-gray-300 rounded-xl">
            <div>
              <img className=" h-12 w-auto" src="/img/logo.svg" alt="Brolly Logo" />
            </div>

            {/* Login Section */}
            <Transition
              as={Fragment}
              show={loginSection === "login"}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form
                className="space-y-8"
                action="#"
                method="POST"
                onSubmit={(ev: any) => {
                  ev.preventDefault();
                  // setLoginSection("reset");
                  _handleLogin();
                }}
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md -space-y-px">
                  <div>
                    <label htmlFor="phoneNumber" className="sr-only">
                      Phone Number
                    </label>
                    <InternationalInput
                      firstLoad
                      className={`bg-swooveGray-200 focus:ring-2 focus:ring-swooveBlue-focus outline-none rounded-lg py-3 px-4 text-sm w-full mb-4`}
                      label={{
                        classNames: "w-full text-swooveGray-caption p-0 mb-1 font-medium text-xs",
                        text: "Pickup Number",
                      }}
                      name={"pickupNumber"}
                      defaultValue={phone}
                      defaultCountry={"gh"}
                      onValueChange={_handlePhoneNumber}
                      disabled={false}
                      autoFocus={true}
                    />
                  </div>
                  {isNewUser ? (
                    <div>
                      <label htmlFor="otpCode" className="sr-only">
                        One Time Password
                      </label>
                      <input
                        id="otpCode"
                        name="otpCode"
                        type="password"
                        autoComplete="current-password"
                        // required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                        placeholder="OTP Code"
                        value={otp}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                          setOTP(ev.currentTarget.value);
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="userPass" className="sr-only">
                        Password
                      </label>
                      <input
                        id="userPass"
                        name="userPass"
                        type="password"
                        autoComplete="current-password"
                        // required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                          console.log(ev.currentTarget.value);
                          setPassword(ev.currentTarget.value);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-main hover:bg-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-border"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </Transition>
            {/* End Login Section */}

            {/* Reset Password Section */}
            <Transition
              as={Fragment}
              show={loginSection === "reset"}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="space-y-4">
                <p>Set New Password</p>
                <form
                  className="space-y-8"
                  action="#"
                  method="POST"
                  onSubmit={(ev: any) => {
                    ev.preventDefault();
                    setPageSection("vehicle_verify");
                  }}
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md space-y-6">
                    <div className="flex relative">
                      <label htmlFor="newPass" className="sr-only">
                        New Password
                      </label>
                      <input
                        id="newPass"
                        name="newPass"
                        type={showPasss ? "text" : "password"}
                        autoComplete="off"
                        // required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                        placeholder="New Password"
                      />
                      <span
                        className={`absolute right-0 rounded-r-lg flex items-center justify-center w-12 h-full p-4 group cursor-pointer`}
                        onClick={(ev: any) => {
                          setShowPass(!showPasss);
                        }}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </span>
                    </div>
                    <em className="text-sm text-gray-500">
                      Password must be at least 6 characters and must have one alphabet and one special character{" "}
                    </em>

                    <div className="flex relative">
                      <label htmlFor="newPass" className="sr-only">
                        Confirm Password
                      </label>
                      <input
                        id="newPass"
                        name="newPass"
                        type={showConfPass ? "text" : "password"}
                        autoComplete="off"
                        // required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                      />
                      <span
                        className={`absolute right-0 rounded-r-lg flex items-center justify-center w-12 h-full p-4 group cursor-pointer`}
                        onClick={(ev: any) => {
                          setShowConfPass(!showConfPass);
                        }}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-main hover:bg-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-border"
                    >
                      Proceed
                    </button>
                  </div>
                </form>
              </div>
            </Transition>
            {/* End Reset Password Section */}
          </div>
        </Transition>

        {/* verify vehicle details section */}
        <Transition
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
        </Transition>
        {/* END Verify vehicle details section */}

        {/* Vehicle extra details section */}
        <Transition
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
        </Transition>
        {/* END Vehicle extra details section */}

        {/* Go to payment screen from previous screen */}

        <Transition
          as={Fragment}
          show={pageSection === "vehicle_details"}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div></div>
        </Transition>
      </main>
    </>
  );
};

export default Network;
