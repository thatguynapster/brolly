/* This example requires Tailwind CSS v2.0+ */
import React, { FC, useState, useContext, useEffect, Fragment } from "react";
import router from "next/router";
import { INavbarProps } from "../../types";
import AuthContext from "../../context/auth-context";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  MenuAlt1Icon,
  MenuIcon,
  PencilAltIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
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
      <div className="w-full mx-auto sm:px-6">
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
            {/* <div className="p-3 rounded-full flex relative ">
              <BellIcon className="w-6 h-6 text-gray-300" />
              <span className="flex h-3 w-3 absolute right-3">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary-border opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-main"></span>
              </span>
            </div> */}
            {/* <div className="p-3 rounded-full flex relative ">
              <ChatIcon className="w-6 h-6 text-gray-300" />
              <span className="flex h-3 w-3 absolute right-3">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary-border opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-main"></span>
              </span>
            </div> */}
            {/* <div className="flex flex-row items-center space-x-3 rounded-md px-2 cursor-pointer group hover:bg-primary-surface">
              {/* <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              /> *
              <p className="font-semibold">{GLOBAL_OBJ.data?.user_name}</p>
              <ChevronDownIcon className="w-4 h-4" />
            </div> */}

            <Menu as="div" className="relative text-left flex">
              <Menu.Button className="flex flex-row items-center space-x-3 rounded-md px-4 py-3 cursor-pointer group hover:bg-primary-surface">
                {GLOBAL_OBJ.data?.user_name}
                <ChevronDownIcon className="w-5 h-5 " aria-hidden="true" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 top-[100%] w-56 origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-violet-500 text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <PencilAltIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                          ) : (
                            <PencilIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                          )}
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                  </div> */}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
