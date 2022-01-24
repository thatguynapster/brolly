import { DocumentTextIcon } from "@heroicons/react/solid";
import React, { FC, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AuthContext from "../../context/auth-context";

// function Sidebar() {
const Sidebar: FC = () => {
  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext);
  const [activePage, setActivePage] = useState<string>("quotes");

  const navList = [
    {
      icon: (
        <DocumentTextIcon className={`w-6 h-6 ${activePage === "quotes" ? "text-primary-main" : "text-gray-300"}`} />
      ),
      page: "quotes",
      text: "Quotes",
      external: false,
    },
    {
      icon: (
        <DocumentTextIcon className={`w-6 h-6 ${activePage === "policies" ? "text-primary-main" : "text-gray-300"}`} />
      ),
      page: "policies",
      text: "Policies",
      external: false,
    },
    {
      icon: (
        <DocumentTextIcon className={`w-6 h-6 ${activePage === "claims" ? "text-primary-main" : "text-gray-300"}`} />
      ),
      page: "claims",
      text: "Claims",
      external: false,
    },
  ];

  return (
    <div className="hidden md:flex flex-col bg-white fixed h-screen w-60 font-sans-Roboto z-10 border-r-2 border-gray-100">
      {/* Businame div */}
      <div className="px-10 pt-8">
        <img className="cursor-pointer w-auto" src="/img/logo.svg" alt="" />
      </div>

      {/* Sidebar Menus */}
      <div className="box-border py-8 overflow-y-auto mb-auto">
        {/* Get Started div */}
        <div className="box-border pt-5 w-2/3">
          {navList.map((_item, i) => {
            return (
              <div
                key={i}
                className={`group box-border flex flex-row items-center cursor-pointer mb-2 py-2 px-4 hover:bg-swooveGray-background ${
                  activePage === _item.page ? "border-primary-main" : "border-transparent"
                } border-l-4 hover:bg-primary-surface rounded-r-full`}
                onClick={() => {
                  activePage !== _item.page
                    ? (setActivePage(_item.page),
                      AUTH_LOGIN({
                        ...GLOBAL_OBJ,
                        currentPage: _item.page,
                      }))
                    : "";
                }}
              >
                <div className={`${_item.page === activePage ? "text-primary-main" : ""}`}>{_item.icon}</div>

                <h2
                  className={`${
                    activePage === _item.page ? "text-gray-600" : "text-gray-400"
                  } text-sm font-medium ml-4 my-auto`}
                >
                  {_item.text}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
