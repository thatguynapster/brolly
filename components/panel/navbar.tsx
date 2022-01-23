/* This example requires Tailwind CSS v2.0+ */
import React, { FC, useState, useContext, useEffect } from "react";
import router from "next/router";
import { INavbarProps } from "../../types";
import AuthContext from "../../context/auth-context";
import { BellIcon, ChatIcon, MenuAlt1Icon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";

// export default function Navbar() {
export const Navbar: FC<INavbarProps> = ({ classNames, showSidebar, onRefresh }) => {
  const [fundWallet, setFundWallet] = useState<boolean>(false);
  const [showPendingModal, setShowPendingModal] = useState<boolean>(false);

  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext);

  useEffect(() => {
    console.log(GLOBAL_OBJ);
  }, []);

  return (
    <div className={`fixed inset-x-0 bg-white text-gray-900 shadow-sm ${classNames}`}>
      <div className="w-full mx-auto px-6 py-8 sm:px-6">
        <div className="flex justify-between items-center md:justify-end md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 space-x-7 md:hidden">
            <MenuIcon
              className={`w-6 h-6 my-auto`}
              onClick={() => {
                showSidebar && showSidebar();
              }}
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="p-3 rounded-full flex relative ">
              <BellIcon className="w-6 h-6 text-gray-300" />
              <span className="flex h-3 w-3 absolute right-3">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary-border opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-main"></span>
              </span>
            </div>
            <div className="p-3 rounded-full flex relative ">
              <ChatIcon className="w-6 h-6 text-gray-300" />
              <span className="flex h-3 w-3 absolute right-3">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary-border opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-main"></span>
              </span>
            </div>
            <div className="flex flex-row items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <p className="font-semibold">Andrew Osei</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
