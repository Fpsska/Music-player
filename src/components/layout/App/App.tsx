import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useTheme } from 'hooks/useTheme';

import { useLocationData } from 'hooks/useLocationData';

import { switchPageStatus } from 'app/slices/mainSlice';
import { setCurrentPlayerData, setCurrentCardID } from 'app/slices/playerSlice';

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
    const { pagesStatuses } = useAppSelector(state => state.mainSlice);
    const { albumList, musicCategory, currentPlayerData } = useAppSelector(
        state => state.playerSlice
    );

    const [initialLoading, setInitialLoadingStatus] = useState<boolean>(true);

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

    useEffect(() => {
        // fix: reload audio track when choose same song in one category playlist
        if (initialLoading) {
            console.log('case');
            const firstSongEl = currentPlayerData[0];
            if (firstSongEl) {
                dispatch(setCurrentCardID({ id: firstSongEl.id }));
                setInitialLoadingStatus(false);
            }
        }
    }, [currentPlayerData, initialLoading]);

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
