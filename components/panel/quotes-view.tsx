import React, { ChangeEvent, Children, FC, Fragment, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";

const QuotesView: FC<{ show: boolean }> = ({ show }) => {
  return (
      <div className={`${!show && "hidden"}`}>
          {/* TODO make below div into a component */}
      <div className="flex flex-col bg-white p-4 rounded-lg group border border-transparent hover:border-primary-border cursor-pointer">
        <h1 className="font-semibold">COMPREHENSIVE</h1>
        <p className="text-gray-700">
          Premium: <span>GHS: 2,000.00</span>
        </p>
        <p className={`bg-primary-main w-max px-2`}>Renewal Date: 21 Dec, 2022</p>

        <p>Action required: </p>
      </div>
    </div>
  );
};

export default QuotesView;
