import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
} from "../../../app/mainSlice";
import { switchCurtainStatus } from "../../../app/burgerSlice";
import SliderRecomendedList from "../../Slider/SliderRecomendedList";
import SliderPlayList from "../../Slider/SliderPlayList";
import PlayListPage from "../Playlist/PlayListPage";
import PlayerPage from "../Player/PlayerPage";
import FilterPage from "../Search/SearchPage";
import BurgerMenu from "../../BurgerMenu/Burger";
import { RootState } from "../../../app/store";

const HomePage: React.FC = () => {
  const { albumList, isPlaylistPage, isPlayerPage, isSearchPage } = useSelector(
    (state: RootState) => state.mainSlice
  );
  const { isBurgerOpen, isLightTheme } = useSelector(
    (state: RootState) => state.burgerSlice
  );
  //
  const [isVisible, setIsVisible] = useState(true);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const goPlayListPage = (): void => {
    dispatch(switchPlaylistPageStatus(true));
    navigate("playlist");
  };
  //
  const goPlayerPage = (): void => {
    dispatch(switchPlayerPageStatus(true));
    navigate("player");
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
    window.addEventListener("resize", defineCurtainStatus);
    window.addEventListener("load", defineCurtainStatus);
    return () => {
      window.removeEventListener("resize", defineCurtainStatus);
      window.removeEventListener("load", defineCurtainStatus);
    };
  }, []);
  // 
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
        ) : isSearchPage ? (
          <FilterPage />
        ) :
          (
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
