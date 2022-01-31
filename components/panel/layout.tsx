import React, { FC, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";
import { mkGetReq } from "../../utils/functions";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";

const Layout: FC<{ onRefresh: () => void }> = ({ onRefresh, children }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext);

  const _getUserDetails = async () => {
    try {
      let set_password_response = await mkGetReq({
        endpoint: `${process.env.NEXT_PUBLIC_API}/api/account`,
        queries: "",
        token: GLOBAL_OBJ.token,
      });
      console.log(set_password_response);

      if (set_password_response.status) {
        toast.error(set_password_response.title);
      } else {
        // handle success
        AUTH_LOGIN({
          ...GLOBAL_OBJ,
          data: {
            ...GLOBAL_OBJ.data,
            user_name: `${set_password_response.firstName} ${set_password_response.lastName}`,
            user_id: set_password_response.id,
          },
        });
      }
    } catch (error) {
      toast.error("Unexpected Error Occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    GLOBAL_OBJ.isLoggedIn && _getUserDetails();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row bg-gray-100">
      <Sidebar />

      {isTabletOrMobile && (
        <SidebarMobile
          show={showSidebar}
          onClose={() => {
            setShowSidebar(false);
          }}
        />
      )}

      <Navbar
        classNames={"md:ml-60 z-10"}
        showSidebar={() => {
          setShowSidebar(true);
        }}
        onRefresh={() => {
          onRefresh && onRefresh();
        }}
      />
      <div className="md:ml-60 mt-28 p-6 w-full">{children}</div>
    </div>
  );
};

export default Layout;
