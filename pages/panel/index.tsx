import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import HeadFile from "../../components/head-file";
import { SEOConfig } from "../../configs/global_variables";

import Layout from "../../components/panel/layout";
import AuthContext from "../../context/auth-context";
import { useRouter } from "next/router";
import QuotesView from "../../components/panel/quotes-view";
import PoliciesView from "../../components/panel/policies-view";

const PanelHome: NextPage = () => {
  const [pageSection, setPageSection] = useState<string>("quotes"); // login | vehicle_verify | vehicle_details | panel

  const { GLOBAL_OBJ } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // console.log(GLOBAL_OBJ);
    !GLOBAL_OBJ.isLoggedIn && router.push("./login");

    return () => {
      mounted = false;
    };
  }, [GLOBAL_OBJ]);

  useEffect(() => {
    let mounted = true;

    // console.log(GLOBAL_OBJ);
    setPageSection(GLOBAL_OBJ.currentPage);

    return () => {
      mounted = false;
    };
  }, [GLOBAL_OBJ.currentPage]);

  return (
    <>
      <HeadFile title={SEOConfig.title} />
      {/* <Header pagename="claims" /> */}
      <main className={`min-h-screen flex items-center justify-center`}>
        <Layout onRefresh={() => {}}>
          {pageSection === "quotes" && <QuotesView />}
          {pageSection === "policies" && <PoliciesView />}
        </Layout>
      </main>
    </>
  );
};

export default PanelHome;
