import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ArrowRightIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Modal } from "../modal";
import router from "next/router";
import CheckPremium from "../check-premium";

const Header: FC<{ pagename: string }> = ({ pagename }) => {
  const [showQuoteForm, setShowQuoteForm] = useState<boolean>(false);

  return (
    <header className="relative bg-white max-w-7xl mx-auto px-4 sm:px-6">
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex flex-row items-center justify-start lg:w-0 lg:flex-1 space-x-10">
              <Link href="/" passHref>
                <a href="#">
                  <img className="cursor-pointer w-auto" src="/img/logo.svg" alt="" />
                </a>
              </Link>
            </div>
            {/* <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-border">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div> */}

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-8"></div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="z-30 absolute top-0 inset-x-0 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white space-y-4">
              <div className="pt-5 px-5">
                <div className="flex items-center justify-between">
                  <Link href="/" passHref>
                    <img className="h-20 w-1/4 sm:h-28" src="/img/logo.svg" alt="" />
                  </Link>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-border">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6"></div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <Modal
        show={showQuoteForm}
        onClose={(ev: any) => {
          setShowQuoteForm(false);
        }}
        className="z-50"
      >
        <XIcon
          className="absolute top-0 right-0 m-4 w-5 h-5"
          onClick={() => {
            setShowQuoteForm(false);
          }}
        />
        <CheckPremium isModal={true} />
      </Modal>
    </header>
  );
};

export default Header;
