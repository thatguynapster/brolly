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
import Script from "next/script";

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

      {process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
          </Script>
        </>
      )}
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
