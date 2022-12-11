import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from '../Common/Layout';

import HomePage from '../Pages/Home/HomePage';
import PlayListPage from '../Pages/Playlist/PlayListPage';
import PlayerPage from '../Pages/Player/PlayerPage';
import FilterPage from '../Pages/Search/SearchPage';

import { useTheme } from '../../hooks/useTheme';

import '../../../node_modules/swiper/swiper.scss';
import '../../assets/scss/_style.scss';
import '../../assets/scss/_media.scss';
import '../../assets/scss/_theme.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/Music-player"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<HomePage />}
                    />
                    <Route
                        path="playlist"
                        element={<PlayListPage />}
                    />
                    <Route
                        path="player"
                        element={<PlayerPage />}
                    />
                    <Route
                        path="search"
                        element={<FilterPage />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
