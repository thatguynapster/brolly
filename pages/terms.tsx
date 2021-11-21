import React, { FC, useEffect, useState } from "react";
import HeadFile from "../components/head-file";
import Header from "../components/header";
import Footer from "../components/footer";
import { SEOConfig } from "../configs/global_variables";

const Privacy: FC = () => {
  const [basePath, setBasePath] = useState<string | null>(null);

  useEffect(() => {
    console.log(window.location.origin);
    setBasePath(window.location.origin);
  }, [basePath]);

  return (
    <>
      <HeadFile title={SEOConfig.title} canonical={`${basePath}/privacy`} />
      <Header />
      <div className="pb-16">
        <div className="max-w-screen-lg px-4 sm:px-6 pt-8 mx-auto text-justify">
          
        </div>
      </div>

      <Footer pagename="privacy" />
    </>
  );
};

export default Privacy;
