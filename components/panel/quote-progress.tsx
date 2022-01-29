import React, { ChangeEvent, Children, FC, Fragment, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";

const QuoteProgress: FC<{ progress: number }> = ({ progress }) => {
  useEffect(() => {
    let mounted = true;

    console.log(progress);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mb-4">
      <div className="w-11/12 mx-auto px-4">
        <div className="bg-swooveGray-disabled-text h-1 flex items-center justify-between">
          {progress >= 0 ? (
            <div className={`${progress === 0 ? "" : "w-1/3"} bg-primary-main h-1 flex items-center`}>
              <div className="bg-primary-main h-6 w-6 rounded-full shadow flex items-center justify-center"></div>
            </div>
          ) : (
            <div className="w-1/3 flex justify-end">
              <div className="bg-white h-6 w-6 rounded-full border-4 border-swooveGray-disabled-text shadow" />
            </div>
          )}
          {progress >= 1 ? (
            <div className={`${progress === 1 ? "" : "w-1/3"} bg-primary-main h-1 flex items-center`}>
              <div className="bg-primary-main h-6 w-6 rounded-full shadow flex items-center justify-center"></div>
            </div>
          ) : (
            <div className="w-1/3 flex justify-end">
              <div className="bg-white h-6 w-6 rounded-full border-4 border-swooveGray-disabled-text shadow" />
            </div>
          )}
          {progress >= 2 ? (
            <div className={`${progress === 2 ? "" : "w-1/3"} bg-primary-main h-1 flex items-center`}>
              <div className="bg-primary-main h-6 w-6 rounded-full shadow flex items-center justify-center"></div>
            </div>
          ) : (
            <div className="w-1/3 flex justify-end">
              <div className="bg-white h-6 w-6 rounded-full border-4 border-swooveGray-disabled-text shadow" />
            </div>
          )}
          {progress >= 3 ? (
            <div className={`${progress === 3 ? "" : "w-1/3"} bg-primary-main h-1 flex items-center`}>
              <div className="bg-primary-main h-6 w-6 rounded-full shadow flex items-center justify-center"></div>
            </div>
          ) : (
            <div className="w-1/3 flex justify-end">
              <div className="bg-white h-6 w-6 rounded-full border-4 border-swooveGray-disabled-text shadow" />
            </div>
          )}
        </div>
      </div>

      {/* <div className="w-11/12 mx-auto mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm capitalize">confirmed</p>
          <p className="text-sm capitalize">assigned</p>
          <p className="text-sm capitalize">picked up</p>
          <p className="text-sm capitalize">delivered</p>
        </div>
      </div> */}
    </div>
  );
};

export default QuoteProgress;
