import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { fetchAlbumsData, switchLoadingStatus } from "../../app/mainSlice";
import { RootState } from "../../app/store";

const Layout: React.FC = () => {
  const { isLightTheme } = useSelector((state: RootState) => state.burgerSlice);
  const { status, isPlayerPage } = useSelector(
    (state: RootState) => state.mainSlice
  );
  const dispatch = useDispatch();
  //
  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        dispatch(switchLoadingStatus(false));
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchAlbumsData());
  }, []);
  // 
  return (
    <>
      <Header />
      <main className="main">
        <div
          className={
            isLightTheme
              ? "page light"
              : isPlayerPage
                ? "page page--player"
                : "page"
          }
        >
          <div className="page__wrapper">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
