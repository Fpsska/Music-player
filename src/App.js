import React from 'react';
import Layout from "./components/Common/Layout"
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';
import PlayListPage from './components/Pages/Playlist/PlayListPage';
import PlayerPage from './components/Pages/Player/PlayerPage';
import "./assets/scss/style.scss"
import "../node_modules/swiper/swiper.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Music-player" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="playlist" element={<PlayListPage />} />
          <Route path="player" element={<PlayerPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
