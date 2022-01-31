import Head from "next/head";
import Script from "next/script";
import { FC, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { IHeaderProps } from "../types";

import { SEOConfig } from "../configs/global_variables";

export const HeadFile: FC<IHeaderProps> = ({ title, canonical }) => {
  const [currentPage, setCurrentPage] = useState<string>("");

  useEffect(() => {
    window !== undefined && setCurrentPage(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="keywords" content="" />

        <link rel="prefetch" href="/img/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <NextSeo
        title={title || SEOConfig.title}
        description={SEOConfig.description}
        canonical={canonical || SEOConfig.canonical || currentPage}
        openGraph={{
          title: title || SEOConfig.title,
          description: SEOConfig.description,
          url: SEOConfig.canonical || process.env.NEXT_PUBLIC_BASE_URL,
          locale: SEOConfig.locale,
          site_name: SEOConfig.site_name,
        }}
        // twitter={{
        //   handle: "@thatguynapster",
        //   site: canonical || SEOConfig.canonical || currentPage,
        //   cardType: "summary",
        // }}
      />
    </>
  );
};

export default HeadFile;
