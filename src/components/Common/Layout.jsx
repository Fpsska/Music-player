import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Navigation />
    </>
  );
};

export default Layout;
