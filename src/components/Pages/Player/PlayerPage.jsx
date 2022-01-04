import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { switchPlayerPageStatus } from "../../../app/mainSlice";
import SliderCard from "../../Common/Slider";

const PlayerPage = () => {
  const { recomendedList, isPlaylistPage } = useSelector(
    (state) => state.mainSlice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate("/Music-player");
    dispatch(switchPlayerPageStatus(false));
  };

  return (
    <>
      <h1 className="page__title title" onClick={goHomePage}>
        <Link to="/Music-player">Playing Now</Link>
      </h1>
      <div className="player">
        <SliderCard recomendedList={recomendedList} />
      </div>
      <div></div>
    </>
  );
};

export default PlayerPage;
