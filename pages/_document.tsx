import React, { useEffect, useState } from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <link rel="shortcut icon" href="/favicon.svg" />
        {process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
          <>
            <script async src="/js/twitter.js" />
            <script async src="/js/facebook-meta.js" />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=948434669206635&ev=PageView&noscript=1"
              />
            </noscript>
          </>
        )}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
