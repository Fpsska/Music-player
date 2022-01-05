import React from "react";
import { useSelector } from "react-redux";
import SliderCard from "../../Common/Slider";
import SvgTemplate from "../../Common/SvgTemplaye";
import Bar from "../../Common/Bar/Bar";

const PlayerPage = () => {
  const { recomendedList, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );

  return (
    <div className="player">
      <div className="player__slider">
        <SliderCard
          recomendedList={recomendedList}
          isPlayerPage={isPlayerPage}
        />
      </div>
      <div className="player__section">
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
        <Bar />
      </div>
    </div>
  );
};

export default PlayerPage;
