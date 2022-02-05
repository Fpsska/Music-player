import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Header from "../Header/Header";

const Layout = () => {
  const { isLightTheme } = useSelector((state) => state.burgerSlice);

  return (
    <>
      <Header />
      <main className="main">
        <div className={isLightTheme ? "page light" : "page"}>
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
