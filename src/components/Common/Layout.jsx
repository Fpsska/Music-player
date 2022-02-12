import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import { switchLoadingStatus } from "../../app/mainSlice";

const Layout = () => {
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  const { status } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        dispatch(switchLoadingStatus(false));
      }, 121312000);
    }
  }, [status]);

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
