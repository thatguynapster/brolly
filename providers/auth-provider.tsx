import AuthContext from "../context/auth-context";
import authReducer from "../reducers/auth-reducer";
import React, { useReducer, useState, useEffect, ReactNode, FC } from "react";
import Cookie from "js-cookie";
import { IAuthPayload } from "../types";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, token: "", data: {} });
  const [ready, setReady] = useState<boolean>(false);

  const loginFunction = (payload: IAuthPayload) => {
    // console.log('Loggin in...')
    // console.log(payload)
    return dispatch({ type: "LOGIN", payload: payload });
  };

  const logoutFunction = () => {
    // console.log('Loggin out...')
    return dispatch({ type: "LOGOUT" });
  };

  const refreshFunction = (payload: IAuthPayload) => {
    // console.log('Refreshing session...')
    // console.log(payload)
    return dispatch({ type: "REFRESH", payload: payload });
  };

  async function initialize() {
    // console.log('initialising cookie handling...')
    try {
      const authCookie = Cookie.get("loggedIn");
      const userSession = Cookie.get("client");
      // console.log(userSession, authCookie)

      if (authCookie === "true" && userSession) {
        // console.log('cookie mission successful: ', authCookie)
        const newState = {
          isLoggedIn: true,
          token: JSON.parse(userSession).token,
          data: {
            user_id: JSON.parse(userSession).data?.user_id,
            user_name: JSON.parse(userSession).data?.user_name,
            user_email: JSON.parse(userSession).data?.user_email,
            user_mobile: JSON.parse(userSession).data?.user_mobile,
            user_image: JSON.parse(userSession).data?.user_image,
          },
          currentPage: "quotes",
        };

        refreshFunction(newState);
        setReady(true);
      } else {
        // console.log('cookie mission failed')
        setReady(true);
        throw "Cookies not set";
      }
    } catch (error) {
      // console.log(error)
      setReady(true);
    }
  }

  useEffect(() => {
    console.log(state);
    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        GLOBAL_OBJ: state,
        AUTH_LOGIN: loginFunction,
        AUTH_REFRESH: refreshFunction,
        AUTH_LOGOUT: logoutFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
