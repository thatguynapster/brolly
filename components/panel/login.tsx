import React, {
  ChangeEvent,
  FC,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LockClosedIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Modal } from "../modal";
import router from "next/router";
import CheckPremium from "../check-premium";
import AuthContext from "../../context/auth-context";
import { toast } from "react-toastify";
import { getQuery, mkPostReq } from "../../utils/functions";
import InternationalInput from "../international-input";

const Login: FC<{ onLoginComplete: () => void }> = ({ onLoginComplete }) => {
  const [loginSection, setLoginSection] = useState<"login" | "reset" | "">(""); // login | reset

  const [showPasss, setShowPass] = useState<boolean>(false); // password | text
  const [showConfPass, setShowConfPass] = useState<boolean>(false);

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [userKey, setUserKey] = useState<string>("");

  const [phone, setPhone] = useState<string>("");
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [dialCode, setDialCode] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [newPass, setNewPass] = useState<string>("");
  const [confNewPass, setConfNewPass] = useState<string>("");

  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext);

  async function _handlePhoneNumber(
    field: string,
    value: string,
    isValid: boolean,
    dial_code: any
  ) {
    setPhoneValid(isValid);
    setPhone(String(value.split("+").pop()));
    // console.log(field, value, isValid, dial_code);
    setDialCode(dial_code);
  }

  const _handleLogin = async (log_dets?: { phone: string; pass: string }) => {
    //check if fields are filled
    if (!log_dets && !phoneValid) {
      toast.error("Please provide a valid phone number");
      return;
    }

    if (!log_dets && password === "") {
      toast.error("Provide your password");
      return;
    }

    // console.log({ phone: phone.replace(dialCode, ""), otp, password });

    //hit login api
    try {
      let some = {
        password: log_dets?.pass,
        phoneNumber: log_dets?.phone,
        rememberMe: false,
      };
      let login_response = await mkPostReq({
        endpoint: `/api/authenticate`,
        method: "post",
        data: log_dets
          ? JSON.stringify(some)
          : JSON.stringify({
              password,
              phoneNumber: phone.replace(dialCode, ""),
              rememberMe: false,
            }),
        isJSON: true,
      });
      // console.log(login_response);

      if (login_response.httpStatus) {
        toast.error(login_response.message);
      } else {
        AUTH_LOGIN({
          token: login_response.id_token,
          isLoggedIn: true,
          currentPage: "quotes",
        });
        onLoginComplete();
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  const _handleSetPassword = async () => {
    if (newPass === "") {
      toast.error("Enter a new password");
      return;
    }

    if (confNewPass === "") {
      toast.error("Confirm your password");
      return;
    }

    if (confNewPass !== newPass) {
      toast.error("Passwords do not match. Recheck and try again");
      return;
    }

    // console.log({ newPass, confNewPass });

    // hit set password api
    try {
      let set_password_response = await mkPostReq({
        endpoint: `/api/account/reset-password/finish`,
        method: "post",
        data: JSON.stringify({
          key: userKey,
          newPassword: newPass,
        }),
        isJSON: true,
      });
      console.log(set_password_response);

      if (set_password_response.status) {
        toast.error(set_password_response.title);
      } else {
        setTimeout(() => {
          _handleLogin({
            phone: set_password_response.phoneNumber,
            pass: newPass,
          });
        }, 1000);
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      // console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    let user_key = getQuery("key");
    setUserKey(String(user_key));
    // console.log(user_key, !(user_key === "" || user_key === null));
    setIsNewUser(!(user_key === "" || user_key === null));
    setLoginSection(
      !(user_key === "" || user_key === null) ? "reset" : "login"
    );

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8 border border-gray-300 rounded-md">
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
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </label>
              <InternationalInput
                firstLoad
                className={`appearance-none relative block w-full py-3 px-4 placeholder-[#848484] border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm`}
                label={{
                  classNames:
                    "w-full text-swooveGray-caption p-0 mb-1 font-medium text-xs",
                  text: "Phone Number",
                }}
                name={"pickupNumber"}
                defaultValue={phone}
                defaultCountry={"gh"}
                onValueChange={_handlePhoneNumber}
                disabled={false}
                autoFocus={true}
                readOnly={false}
              />
            </div>
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                  // console.log(ev.currentTarget.value);
                  setPassword(ev.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-main hover:bg-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-border"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-white group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </Transition>
      {/* End Login Section */}

      {/* Set New Password Section */}
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
              _handleSetPassword();
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
                  onChange={(ev) => {
                    setNewPass(ev.currentTarget.value);
                  }}
                />
                <span
                  className={`absolute right-0 rounded-r-lg flex items-center justify-center w-12 h-full p-4 group cursor-pointer`}
                  onClick={(ev: any) => {
                    setShowPass(!showPasss);
                  }}
                >
                  {showPasss ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </span>
              </div>
              <em className="text-sm text-gray-500">
                Password must be at least 6 characters and must have one
                alphabet and one special character{" "}
              </em>

              <div className="flex relative">
                <label htmlFor="confirmPass" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPass"
                  name="confirmPass"
                  type={showConfPass ? "text" : "password"}
                  autoComplete="off"
                  // required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-border focus:border-primary-border focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  onChange={(ev) => {
                    setConfNewPass(ev.currentTarget.value);
                  }}
                />
                <span
                  className={`absolute right-0 rounded-r-lg flex items-center justify-center w-12 h-full p-4 group cursor-pointer`}
                  onClick={(ev: any) => {
                    setShowConfPass(!showConfPass);
                  }}
                >
                  {showConfPass ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
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
      {/* End Set New Password Section */}
    </div>
  );
};

export default Login;
