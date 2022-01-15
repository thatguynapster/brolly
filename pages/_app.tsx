import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
/** Auth provider */
import AuthProvider from "../providers/auth-provider";

/** Global css */
import "../styles/globals.css";
import "../public/css/index.css";
import "../public/css/scrollbar.css";

/** dependency styles */
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} limit={5} />
    </AuthProvider>
  );
}

export default MyApp;
