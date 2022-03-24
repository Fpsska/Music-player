import React from "react";
import { useSelector } from "react-redux";
import Layout from "./components/Common/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/Home/HomePage";
import PlayListPage from "./components/Pages/Playlist/PlayListPage";
import PlayerPage from "./components/Pages/Player/PlayerPage";
import FilterPage from "./components/Pages/Search/SearchPage";
import "./assets/scss/style.scss";
import "./assets/scss/media.scss";
import "../node_modules/swiper/swiper.scss";
import { RootState } from "./app/store";

const App: React.FC = () => {
  const { isLightTheme } = useSelector((state: RootState) => state.burgerSlice);

  return (
    <div className={isLightTheme ? "App light" : "App"}>
      <Routes>
        <Route path="/Music-player" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="playlist" element={<PlayListPage />} />
          <Route path="player" element={<PlayerPage />} />
          <Route path="search" element={<FilterPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
