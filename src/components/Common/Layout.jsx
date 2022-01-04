import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="page">
          <div className="page__wrapper">
            <Outlet />
          </div>
        </div>
      </main>
      <Navigation />
    </>
  );
};

export default Layout;
