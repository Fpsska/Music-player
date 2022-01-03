import React from 'react';
import Layout from "./components/Common/Layout"
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';
import "./assets/scss/style.scss"
import "../node_modules/swiper/swiper.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
