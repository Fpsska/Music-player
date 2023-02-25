import React, { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { switchPageStatus } from '../../app/slices/mainSlice';
import { setCurrentPlayerData } from '../../app/slices/playerSlice';

import { determineCurrentPlayerData } from '../../helpers/determineCurrentPlayerData';

import Layout from '../Common/Layout';

import HomePage from '../Pages/Home/HomePage';
import PlayListPage from '../Pages/Playlist/PlayListPage';
import PlayerPage from '../Pages/Player/PlayerPage';
import FilterPage from '../Pages/Search/SearchPage';

import { useTheme } from '../../hooks/useTheme';
import { useLocationData } from '../../hooks/useLocationData';

import './App.css';
import '../../assets/styles/_reset.scss';
import '../../assets/styles/style.scss';
import '../../assets/styles/_media.scss';
import '../../assets/styles/_theme.scss';

import '../../../node_modules/swiper/swiper.scss';

// /. imports

const App: React.FC = () => {
    const { albumList } = useAppSelector(state => state.playerSlice);

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
            setCurrentPlayerData(
                determineCurrentPlayerData(albumList, 'recomended')
            )
        );
    }, [albumList]);

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
