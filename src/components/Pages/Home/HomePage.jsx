import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import Slider from "../../Common/Slider";
import PlayListPage from "../Playlist/PlayListPage";
import PlayerPage from "../Player/PlayerPage";
import BurgerMenu from "../../Common/BurgerMenu/BurgerMenu";

const HomePage = () => {
  const { recomendedList, isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );
  const { isBurgerOpen } = useSelector((state) => state.burgerSlice);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const goPlayListPage = () => {
    dispath(switchPlaylistPageStatus(true));
    navigate("playlist");
  };

  return (
    <div className="home">
      {isPlaylistPage ? (
        <PlayListPage />
      ) : isPlayerPage ? (
        <PlayerPage />
      ) : (
        <>
          <div className="home__section">
            {isBurgerOpen ? <BurgerMenu /> : <></>}
          </div>
          <div className="home__section home__section--recommendation">
            <h1 className="page__title title">Recomended for you</h1>
            <div className="home__slider">
              <Slider recomendedList={recomendedList} />
            </div>
          </div>
          <div className="home__section home__section--playlist">
            <h2 className="page__title title" onClick={goPlayListPage}>
              <Link to="playlist">My Playlist</Link>
            </h2>
            <Slider
              recomendedList={recomendedList}
              isPlayerPage={isPlayerPage}
            />
          </div>
          <div className="home__section home__section--playlist">
            <h2 className="page__title title" onClick={goPlayListPage}>
              <Link to="playlist">Test</Link>
            </h2>
            <div className="home__slider">
              <Slider
                recomendedList={recomendedList}
                isPlayerPage={isPlayerPage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
