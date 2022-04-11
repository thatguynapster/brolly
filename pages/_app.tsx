import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
/** Auth provider */
import AuthProvider from "../providers/auth-provider";

import AOS from "aos";

/** Global css */
import "../styles/globals.css";
import "../public/css/index.css";
import "../public/css/scrollbar.css";
import "../public/css/intlTelInput.css";

import "intl-tel-input/build/css/intlTelInput.css";

import "../public/css/owl.carousel.css";
import "../public/css/owl.theme.default.css";
import "../public/css/carousel.css";

/** dependency styles */
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.browser) {
      console.log("in browser");

      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });

      setTimeout(() => {
        console.log("DOM loaded");
        document?.querySelector("svg")?.classList.add("animated");
      }, 500);
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={5}
      />
    </AuthProvider>
  );
}

export default MyApp;
