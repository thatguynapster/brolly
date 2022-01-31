import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import { toast } from "react-toastify";
import router from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentTextIcon, XIcon } from "@heroicons/react/outline";

// function Sidebar() {
const SidebarMobile: FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [activePage, setActivePage] = useState<string>("quotes");

  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext);

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

  useEffect(() => {
    setOpen(show);
  }, [show]);

  useEffect(() => {
    console.log(open);
    !open && onClose();
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden md:hidden z-50" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 left-0 max-w-full flex z-20">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="-translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="-translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative w-screen max-w-xs">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-8 pt-4 pl-2 flex sm:-mr-10 sm:pl-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  {/* Businame Div */}
                  <div className="px-10 pt-8">
                    <img className="cursor-pointer w-auto" src="/img/logo.svg" alt="" />
                  </div>
                  {/* End Business Div */}

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
                              activePage !== _item.page &&
                                AUTH_LOGIN({
                                  ...GLOBAL_OBJ,
                                  currentPage: _item.page,
                                });
                            }}
                          >
                            <div className={`${_item.page === activePage ? "text-primary-main" : ""}`}>
                              {_item.icon}
                            </div>

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
                  {/* End Sidebar Menus */}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SidebarMobile;
