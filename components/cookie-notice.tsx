import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

const CookieNotice: FC = () => {
  let hiddenRef = useRef(null);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // check local storage if cookie is accepted
    let cookie_accepted = localStorage.getItem("cookies_accepted");
    // console.log(cookie_accepted);
    if (!cookie_accepted || cookie_accepted === "false") {
      openModal();
    }
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const _handleCookieNotice = () => {
    localStorage.setItem("cookies_accepted", "true");
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            closeModal();
          }}
          initialFocus={hiddenRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="fixed bottom-0 right-0 left-0 inline-block w-full p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-md"
                ref={hiddenRef}
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Cookie Notice
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please accept our cookies policy to help us keep our website safe, give you a better experience, and
                    show more relevant content. See our cookies policy to{" "}
                    <Link href="/legal?section=cookies" passHref>
                      <a href="#" className="font-semibold text-dark focus:outline-none">
                        {" "}
                        read more
                      </a>
                    </Link>
                    .
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-dark bg-primary-main hover:bg-primary-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={_handleCookieNotice}
                  >
                    I accept
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CookieNotice;
