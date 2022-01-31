import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";

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
      <footer className="footer"></footer>
    </>
  );
};

export default Layout;
