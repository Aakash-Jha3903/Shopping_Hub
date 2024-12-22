import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FooterComp from "./Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <FooterComp />
    </div>
  );
};

export default Layout;
