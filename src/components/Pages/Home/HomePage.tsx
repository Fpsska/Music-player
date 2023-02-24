import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { switchPageStatus } from '../../../app/slices/mainSlice';
import { setCurrentPlayerData } from '../../../app/slices/playerSlice';
import { switchCurtainStatus } from '../../../app/slices/burgerSlice';

import { determineCurrentPlayerData } from '../../../helpers/determineCurrentPlayerData';

import Slider from '../../Slider/Slider';
import BurgerMenu from '../../BurgerMenu/Burger';

// /. imports

const HomePage: React.FC = () => {
    const { isBurgerOpen } = useAppSelector(state => state.burgerSlice);
    const { albumList } = useAppSelector(state => state.playerSlice);

    const [isVisible, setIsVisible] = useState(true);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const goPlayListPage = (): void => {
        navigate('playlist');
        dispatch(
            setCurrentPlayerData(
                determineCurrentPlayerData(albumList, 'playlist')
            )
        );
    };

    const goToRecomendedSongs = (): void => {
        navigate('player');
        dispatch(
            setCurrentPlayerData(
                determineCurrentPlayerData(albumList, 'recomended')
            )
        );
    };

    const goToPopularSongs = (): void => {
        navigate('player');
        dispatch(
            setCurrentPlayerData(
                determineCurrentPlayerData(albumList, 'popular')
            )
        );
    };

    // /. functions

    useEffect(() => {
        setIsVisible(!isVisible);
    }, [isBurgerOpen]);

    useLayoutEffect(() => {
        const defineCurtainStatus = (): void => {
            if (window.innerWidth >= 768) {
                dispatch(switchCurtainStatus(false));
            } else {
                dispatch(switchCurtainStatus(true));
            }
        };

        window.addEventListener('resize', defineCurtainStatus);
        window.addEventListener('load', defineCurtainStatus);
        return () => {
            window.removeEventListener('resize', defineCurtainStatus);
            window.removeEventListener('load', defineCurtainStatus);
        };
    }, []);

    // /. effects

    return (
        <>
            <div className="page__burger">{isBurgerOpen && <BurgerMenu />}</div>
            <section className="home">
                <div className="home__section home__section--recommendation">
                    <span
                        className="page__title title"
                        onClick={goToRecomendedSongs}
                    >
                        <Link to="player">Recomended for you</Link>
                    </span>
                    <div className="home__slider">
                        <Slider role={'recomended'} />
                    </div>
                </div>
                <div className="home__section home__section--playlist">
                    <span
                        className="page__title title"
                        onClick={goPlayListPage}
                    >
                        <Link to="playlist">My Playlist</Link>
                    </span>
                    <Slider role={'playlist'} />
                </div>
                <div className="home__section home__section--playlist">
                    <span
                        className="page__title title"
                        onClick={goToPopularSongs}
                    >
                        <Link to="playlist">Popular</Link>
                    </span>
                    <Slider role={'popular'} />
                </div>
            </section>
        </>
    );
};

export default HomePage;
