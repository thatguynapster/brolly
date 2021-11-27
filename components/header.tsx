import React, { FC, Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Header: FC = () => {
  return (
    <header className="relative bg-white max-w-7xl mx-auto px-4 sm:px-6">
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" passHref>
                <a>
                  <img className="cursor-pointer h-20 w-auto sm:h-28" src="/img/logo.svg" alt="" />
                </a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-border">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-8">
              <nav className="hidden md:flex space-x-10">
                <Link href="/who-we-are" passHref>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">Who we are</a>
                </Link>
                <Link href="/how-it-works" passHref>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">How it works</a>
                </Link>
              </nav>

              <div className="">
                <a
                  href="#"
                  className="whitespace-nowrap text-base font-medium hover:text-gray-900 bg-primary-main py-4 px-6 border-0 shadow-sm"
                >
                  Get a Quote
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap inline-flex items-center justify-center py-4 px-6 border border-transparent shadow-sm text-base font-medium bg-background"
                >
                  24/7 support
                </a>
              </div>
            </div>
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
          <Popover.Panel focus className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href="/" passHref>
                      <img className="h-20 w-auto sm:h-28" src="/img/logo.svg" alt="" />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-border">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link href="/who-we-are">
                      <span className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 ml-3 text-base font-medium text-gray-900">
                        Who we are
                      </span>
                    </Link>
                    <Link href="/how-it-works">
                      <span className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 ml-3 text-base font-medium text-gray-900">
                        How it works
                      </span>
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center whitespace-nowrap text-base font-medium hover:text-gray-900 bg-primary-main py-4 px-6 border-0 shadow-sm"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center whitespace-nowrap text-base font-medium hover:text-gray-900 py-4 px-6 border-0 shadow-sm bg-background"
                  >
                    24/7 support
                  </a>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
};

export default Header;
