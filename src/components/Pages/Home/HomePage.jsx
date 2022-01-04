import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import Slider from "../../Common/Slider";
import PlayListPage from "../Playlist/PlayListPage";
import PlayerPage from "../Player/PlayerPage";

const HomePage = () => {
  const { recomendedList, isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );

  const dispath = useDispatch();
  const navigate = useNavigate();

  const goPlayListPage = () => {
    dispath(switchPlaylistPageStatus(true));
    navigate("playlist");
  };

  return (
    <>
      {isPlaylistPage ? (
        <PlayListPage />
      ) : isPlayerPage ? (
        <PlayerPage />
      ) : (
        <>
          <h1 className="page__title title">Recomended for you</h1>
          <div className="page__section page__section--recommendation">
            <div className="recommendation">
              <Slider recomendedList={recomendedList} />
            </div>
          </div>
          <div className="page__section page__section--playlist">
            <h2 className="page__title title" onClick={goPlayListPage}>
              <Link to="playlist">My Playlist</Link>
            </h2>
            <div className="playlist">
              <Slider recomendedList={recomendedList} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
