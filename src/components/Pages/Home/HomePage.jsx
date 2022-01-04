import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import Slider from "../../Common/Slider"
import PlayListPage from "../Playlist/PlayListPage";

const HomePage = () => {
  const { recomendedList, playList, isPlaylistPage } = useSelector(
    (state) => state.mainSlice
  );

  const dispath = useDispatch();

  const goPlayListPage = () => {
    dispath(switchPlaylistPageStatus(true));
  };

  return (
    <>
      {isPlaylistPage ? (
        <PlayListPage />
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
              My Playlist
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
