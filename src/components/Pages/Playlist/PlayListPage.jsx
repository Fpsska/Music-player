import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import CardList from "../../Common/Card/CardList";

const PlayListPage = () => {
  const { recomendedList } = useSelector((state) => state.mainSlice);

  const dispath = useDispatch();

  const goHomePage = () => {
    dispath(switchPlaylistPageStatus(false));
  };

  return (
    <>
      <h1 className="page__title title" onClick={goHomePage}>
        Liked Songs
      </h1>
      <div className="playlist">
        <div className="playlist__wrapper">
          <CardList recomendedList={recomendedList} />
        </div>
      </div>
    </>
  );
};

export default PlayListPage;
