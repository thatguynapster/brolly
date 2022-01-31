import React, { Fragment, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import { Transition } from "@headlessui/react";
import Login from "../components/panel/login";
import Layout from "../components/panel/layout";
import AuthContext from "../context/auth-context";
import Router, { useRouter } from "next/router";

const Network: NextPage = () => {
  const [pageSection, setPageSection] = useState<string>("login"); // login | vehicle_verify | vehicle_details | panel

  const { GLOBAL_OBJ } = useContext(AuthContext);

  let router = useRouter();

  useEffect(() => {
    let mounted = true;
    console.log(GLOBAL_OBJ);
    if (!GLOBAL_OBJ.isLoggedIn) {
      setPageSection("login");
    } else {
      router.push("./panel");
    }
    return () => {
      mounted = false;
    };
  }, [GLOBAL_OBJ]);

  return (
    <>
      <HeadFile title={SEOConfig.title} />
      {/* <Header pagename="claims" /> */}
      <main className={`h-screen flex items-center justify-center`}>
        <Transition
          as={"div"}
          show={pageSection === "login"}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className={"max-w-md w-full"}
        >
          <Login
            onLoginComplete={() => {
              router.push("./panel");
            }}
          />
        </Transition>
      </main>
    </>
  );
};

export default Network;
