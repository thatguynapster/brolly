import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import FormGroup from "../components/form-group";
import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";

import { KeyIcon, MailIcon } from "@heroicons/react/outline";


const Home: NextPage = () => {

  return (
    <>
      <HeadFile title={`${SEOConfig.title}`} />
      <main className="bg-background flex justify-center items-center w-full min-h-screen px-4 md:px-0">
        
      </main>
    </>
  );
};

export default Home;
