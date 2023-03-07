import React, { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useTheme } from 'hooks/useTheme';

import { useLocationData } from 'hooks/useLocationData';

import { switchPageStatus } from 'app/slices/mainSlice';
import { setCurrentPlayerData } from 'app/slices/playerSlice';

import { determineCurrentPlayerData } from 'helpers/determineCurrentPlayerData';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import HomePage from 'pages/Home/HomePage';

import PlayListPage from 'pages/Playlist/PlayListPage';
import PlayerPage from 'pages/Player/PlayerPage';
import FilterPage from 'pages/Search/SearchPage';

import Layout from '../Layout';

import './App.css';
import 'assets/styles/_reset.scss';
import 'assets/styles/style.scss';
import 'assets/styles/_media.scss';
import 'assets/styles/_theme.scss';

// /. imports

const App: React.FC = () => {
    const { albumList, musicCategory } = useAppSelector(
        state => state.playerSlice
    );

    const { setTheme } = useTheme();
    const location = useLocationData();

    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        dispatch(switchPageStatus({ locationData: location }));
    }, [location]);

    useEffect(() => {
        // set (recomended category) data as initial data for playing
        dispatch(
            setCurrentPlayerData({
                data: determineCurrentPlayerData(albumList, musicCategory)
            })
        );
    }, [albumList, musicCategory]);

    // /. effects

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
