import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import CardList from "../../Common/Card/CardList";
import Navigation from "../../Navigation/Navigation";

const PlayListPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const goHomePage = () => {
    dispath(switchPlaylistPageStatus(false));
    navigate("/Music-player");
  };

  return (
    <>
      <div className="playlist">
        <div className="container">
          <h1 className="page__title title" onClick={goHomePage}>
            <Link to="/Music-player">Liked Songs</Link>
          </h1>
          <div className="playlist__wrapper">
            <CardList />
          </div>
        </div>
      </div>
      <div className="page__navigation">
        <Navigation />
      </div>
    </>
  );
};

export default PlayListPage;
