import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus
} from '../../../app/slices/mainSlice';
import {
  switchCurtainStatus
} from '../../../app/slices/burgerSlice';

import { RootState } from '../../../app/store';

import SliderRecomendedList from '../../Slider/SliderRecomendedList';
import SliderPlayList from '../../Slider/SliderPlayList';
import BurgerMenu from '../../BurgerMenu/Burger';

// /. imports

const HomePage: React.FC = () => {
  const { albumList } = useAppSelector(
    (state: RootState) => state.mainSlice
  );
  const { isBurgerOpen } = useAppSelector(
    (state: RootState) => state.burgerSlice
  );
  //
  const [isVisible, setIsVisible] = useState(true);
  //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //
  const goPlayListPage = (): void => {
    dispatch(switchPlaylistPageStatus(true));
    navigate('playlist');
  };
  //
  const goPlayerPage = (): void => {
    dispatch(switchPlayerPageStatus(true));
    navigate('player');
  };

  const defineCurtainStatus = (): void => {
    if (window.innerWidth >= 768) {
      dispatch(switchCurtainStatus(false));
    } else {
      dispatch(switchCurtainStatus(true));
    }
  };
  //
  useEffect(() => {
    setIsVisible(!isVisible);
  }, [isBurgerOpen]);

  useLayoutEffect(() => {
    window.addEventListener('resize', defineCurtainStatus);
    window.addEventListener('load', defineCurtainStatus);
    return () => {
      window.removeEventListener('resize', defineCurtainStatus);
      window.removeEventListener('load', defineCurtainStatus);
    };
  }, []);
  // 
  return (
    <>
      <div className="page__burger">
        {isBurgerOpen ? <BurgerMenu /> : <></>}
      </div>
      <div className="home">
        <div className="home__section home__section--recommendation">
          <h1 className="page__title title" onClick={goPlayerPage}>
            <Link to="player">Recomended for you</Link>
          </h1>
          <div className="home__slider">
            <SliderRecomendedList albumList={albumList} />
          </div>
        </div>
        <div className="home__section home__section--playlist">
          <h2 className="page__title title" onClick={goPlayListPage}>
            <Link to="playlist">My Playlist</Link>
          </h2>
          <SliderPlayList albumList={albumList} />
        </div>
        <div className="home__section home__section--playlist">
          <h2 className="page__title title" onClick={goPlayListPage}>
            <Link to="playlist">Test</Link>
          </h2>
          <SliderPlayList albumList={albumList} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
