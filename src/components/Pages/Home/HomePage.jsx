import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus
} from "../../../app/mainSlice";
import { switchCurtainStatus } from "../../../app/burgerSlice";
import SliderRecomendedList from "../../Slider/SliderRecomendedList";
import SliderPlayList from "../../Slider/SliderPlayList";
import PlayListPage from "../Playlist/PlayListPage";
import PlayerPage from "../Player/PlayerPage";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";

const HomePage = () => {
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
  // 

  const defineCurtainStatus = () => {
    if (window.innerWidth >= 768) {
      dispatch(switchCurtainStatus(false))
    } else {
      dispatch(switchCurtainStatus(true))
    }
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", defineCurtainStatus)
    window.addEventListener("load", defineCurtainStatus)
    return () => {
      window.removeEventListener("resize", defineCurtainStatus)
      window.removeEventListener("load", defineCurtainStatus);
    }
  }, [])

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
    </>
  );
};

export default HomePage;
