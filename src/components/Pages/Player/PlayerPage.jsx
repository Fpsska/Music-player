import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { switchPlayerPageStatus } from "../../../app/mainSlice";
import SliderCard from "../../Common/Slider";
import SvgTemplate from "../../Common/SvgTemplaye";
import Buttons from "../../Common/Buttons/Buttons";

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
      <div>
        <div className="player__navigation">
          <button
            className="player__button player__button--volume"
            type="button"
          >
            <SvgTemplate id="volume" />
          </button>
          <button
            className="player__button player__button--repeat"
            type="button"
          >
            <SvgTemplate id="repeat" />
          </button>
          <button className="player__button player__button--oder" type="button">
            <SvgTemplate id="oder" />
          </button>
        </div>
        <div className="player__time time">
          <span className="time__current">00:50</span>
          <span className="time__length">04:00</span>
        </div>
        <Buttons/>
      </div>
    </>
  );
};

export default PlayerPage;
