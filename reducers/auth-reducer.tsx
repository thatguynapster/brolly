import Cookie from "js-cookie";
import { IAuthState, IAuthAction, IAuthPayload } from "../types";

const authReducer = (state: IAuthState, action: IAuthAction) => {
  // console.log(state)
  switch (action.type) {
    case "LOGIN":
      // console.log("login here")
      // console.log(action.payload)
      let authenticated;
      let userData = "";
      /**Authentication requests done here */
      try {
        Cookie.set("loggedIn", "true", { expires: 1, sameSite: "lax" });
        userData = JSON.stringify(action.payload);
        // console.log(action.payload)
        Cookie.set("user", userData, { expires: 1, sameSite: "lax" });
        sessionStorage.setItem("user", userData);

        //check rememberMe
        if (action.payload?.rememberMe) {
          const encodedUserData = btoa(userData);
          localStorage.setItem("user", encodedUserData);
        }
        // console.log('Cookies set')
        authenticated = true;
      } catch (error) {
        // console.log(error)
        authenticated = false;
        userData = "";
      }

      /** Always return state */
      return {
        ...state,
        isLoggedIn: authenticated,
        token: action?.payload && action.payload.token,
        data: JSON.parse(userData).data,
        currentPage: action.payload?.currentPage,
      };

    case "REFRESH":
      // console.log(action.payload)

      sessionStorage.setItem("user", JSON.stringify(action.payload));
      Cookie.set("user", JSON.stringify(action.payload), { expires: 1, sameSite: "lax" });

      /** Always return state */
      return {
        ...state,
        isLoggedIn: action?.payload?.isLoggedIn,
        token: action?.payload?.token,
        data: action?.payload?.data,
        currentPage: action.payload?.currentPage,
      };

    case "LOGOUT":
      // console.log('loggin out...')
      /** Destroy all cookies or storage */
      Cookie.remove("loggedIn", { sameSite: "lax" });
      Cookie.remove("user", { sameSite: "lax" });
      Cookie.remove("user", { sameSite: "lax" });

      sessionStorage.removeItem("loggedIn");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("user");

      //set login to false and save into localStorage
      let user = localStorage.getItem("user");
      if (user) {
        let decodedUserData: IAuthPayload = JSON.parse(atob(user as string));
        decodedUserData = { ...decodedUserData, isLoggedIn: false };
        let encodedUserData = btoa(JSON.stringify(decodedUserData));
        localStorage.setItem("user", encodedUserData);
      }

      return {
        ...state,
        isLoggedIn: false,
        token: "",
        data: null,
        currentPage: null,
      };
    default:
      /** Always return state */
      return state;
  }
};

export default authReducer;
