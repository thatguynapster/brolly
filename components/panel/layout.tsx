import React, { ChangeEvent, Children, FC, Fragment, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "./navbar";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";

const Layout: FC<{ onRefresh: () => void }> = ({ onRefresh, children }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen flex flex-row">
      <Sidebar onPageSwitch={() => {}} />

      {isTabletOrMobile && (
        <SidebarMobile
          show={showSidebar}
          onClose={() => {
            setShowSidebar(false);
          }}
          onRefresh={() => {
            onRefresh && onRefresh();
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
      <div className="md:ml-60 mt-28">
      {children}</div>
    </div>
  );
};

export default Layout;
