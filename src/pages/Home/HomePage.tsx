import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import BurgerMenu from 'components/ui/BurgerMenu/Burger';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setCurrentPlayerData } from 'app/slices/playerSlice';
import { switchCurtainStatus } from 'app/slices/burgerSlice';

import { determineCurrentPlayerData } from 'utils/helpers/determineCurrentPlayerData';

import Slider from 'components/layout/Slider/Slider';

// /. imports

const HomePage: React.FC = () => {
    const { isBurgerOpen } = useAppSelector(state => state.burgerSlice);
    const { albumList } = useAppSelector(state => state.playerSlice);

    const [isVisible, setIsVisible] = useState(true);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const goPlayListPage = (): void => {
        navigate('playlist', {
            state: {
                title: 'Liked Songs'
            }
        });
        // determine data for audio element
        dispatch(
            setCurrentPlayerData({
                data: determineCurrentPlayerData(albumList, 'playlist')
            })
        );
    };

    const goToRecomendedSongs = (): void => {
        navigate('playlist', {
            state: {
                title: 'Recomended Songs'
            }
        });
        dispatch(
            setCurrentPlayerData({
                data: determineCurrentPlayerData(albumList, 'recomended')
            })
        );
    };

    const goToPopularSongs = (): void => {
        navigate('playlist', {
            state: {
                title: 'Popular Songs'
            }
        });
        dispatch(
            setCurrentPlayerData({
                data: determineCurrentPlayerData(albumList, 'popular')
            })
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
