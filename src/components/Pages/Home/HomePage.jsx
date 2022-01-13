import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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

const HomePage = () => {
  //
  const { playList, recomendedList, isPlaylistPage, isPlayerPage } =
    useSelector((state) => state.mainSlice);
  const { isBurgerOpen } = useSelector((state) => state.burgerSlice);
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

  return (
    <>
      <div className="page__burger">
        {isBurgerOpen ? <BurgerMenu /> : <></>}
      </div>
      <div className={isBurgerOpen ? "home opacity" : "home"}>
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
                <SliderRecomendedList
                  recomendedList={recomendedList}
                  playList={playList}
                />
              </div>
            </div>
            <div className="home__section home__section--playlist">
              <h2 className="page__title title" onClick={goPlayListPage}>
                <Link to="playlist">My Playlist</Link>
              </h2>
              <SliderPlayList
                recomendedList={recomendedList}
                playList={playList}
              />
            </div>
            <div className="home__section home__section--playlist">
              <h2 className="page__title title" onClick={goPlayListPage}>
                <Link to="playlist">Test</Link>
              </h2>
              <SliderPlayList playList={playList} />
            </div>
          </>
        )}
      </div>
      <div className="page__navigation">
        <Navigation />
      </div>
    </>
  );
};

export default HomePage;
