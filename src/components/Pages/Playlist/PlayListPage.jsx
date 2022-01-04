import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import CardList from "../../Common/Card/CardList";

const PlayListPage = () => {
  const { recomendedList } = useSelector((state) => state.mainSlice);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const goHomePage = () => {
    dispath(switchPlaylistPageStatus(false));
    navigate("/Music-player");
  };

  return (
    <>
      <h1 className="page__title title" onClick={goHomePage}>
        <Link to="/Music-player">Liked Songs</Link>
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
