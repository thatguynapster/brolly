import React, { FC } from "react";

const CookiesPolicy: FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <h1 className="text-4xl font-bold text-dark">
          Cookie Policy <span className="text-sm text-gray-700 font-semibold italic">~ November 1st, 2021</span>
        </h1>
      </div>
      {/* <h2 className="text-xl font-bold">Cookie Notice</h2> */}
      {/* <p>
        Please accept our cookies policy to help us keep our website safe, give you a better experience, and show more
        relevant content. See our cookies policy to read more.]
      </p> */}

      <div className="space-y-8">
        <h2 className="text-xl font-bold text-dark text-left">What are cookies?</h2>
        <p>
          Cookies are small text files that are stored in your web browser that allows Brolly or a third party to
          recognize you. Cookies can be used to collect, store and share bits of information about your activities
          across websites, including on the Brolly web app.
        </p>
        <p>
          Cookies might be used for the following purposes:
          <li>To enable certain functions</li>
          <li>To provide analytics</li>
          <li>To store your preferences</li>
          <li>To enable ad delivery and behavioral advertising</li>
          Brolly uses both session cookies and persistent cookies.
        </p>
        <p>
          A session cookie is used to identify a particular visit to our Web App. These cookies expire after a short
          time, or when you close your web browser after using our Web App. We use these cookies to identify you during
          a single browsing session, such as when you log into our Web App. A persistent cookie will remain on your
          devices for a set period of time specified in the cookie. We use these cookies where we need to identify you
          over a longer period of time. For example, we would use a persistent cookie if you asked that we keep you
          signed in.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">How third parties use cookies on the Brolly Website</h2>
        <p>
          Third party companies like analytics companies and ad networks generally use cookies to collect user
          information on an anonymous basis. They may use that information to build a profile of your activities on the
          Brolly Web App and other websites that you have visited.
        </p>

        <h2 className="text-xl font-bold text-dark text-left">Cookies options</h2>
        <p>
          If you don't like the idea of cookies or certain types of cookies, you can change your browser's settings to
          delete cookies that have already been set and to not accept new cookies. To learn more about how to do this,
          visit the help pages of your browser. Please note, however, that if you delete cookies or do not accept them,
          you might not be able to use all of the features we offer, you may not be able to store your preferences, and
          some of our pages might not display properly.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicy;
