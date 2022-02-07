import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Spring, animated } from "react-spring";
import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
} from "../../../app/mainSlice";
import SliderRecomendedList from "../../Common/Slider/SliderRecomendedList";
import SliderPlayList from "../../Common/Slider/SliderPlayList";
import PlayListPage from "../Playlist/PlayListPage";
import PlayerPage from "../Player/PlayerPage";
import BurgerMenu from "../../Common/BurgerMenu/BurgerMenu";
import Navigation from "../../Navigation/Navigation";

import { fetchAlbumsData } from "../../../app/mainSlice";

const HomePage = () => {
  //
  const { albumList, isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );

  const { isBurgerOpen, isLightTheme } = useSelector(
    (state) => state.burgerSlice
  );
  //
  const [isVisible, setIsVisible] = useState(true);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const goPlayListPage = () => {
    dispatch(switchPlaylistPageStatus(true));
    navigate("playlist");
  };
  //
  const goPlayerPage = () => {
    dispatch(switchPlayerPageStatus(true));
    navigate("player");
  };

  useEffect(() => {
    setIsVisible(!isVisible);
  }, [isBurgerOpen]);

  useEffect(() => {
    dispatch(fetchAlbumsData());
  }, [dispatch]);

  return (
    <>
      <div className="page__burger">
        {isBurgerOpen ? <BurgerMenu /> : <></>}
      </div>
      <div className={isLightTheme ? "home light" : "home"}>
        {isPlaylistPage ? (
          <PlayListPage />
        ) : isPlayerPage ? (
          <PlayerPage />
        ) : (
          <>
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
          </>
        )}
      </div>
      <Spring
        from={{ transform: "translateY(0px)" }}
        to={{ transform: "translateY(0px)" }}
        reverse={isVisible}
      >
        {(styles) => (
          <animated.div className="page__navigation" style={styles}>
            <Navigation />
          </animated.div>
        )}
      </Spring>
    </>
  );
};

export default HomePage;
