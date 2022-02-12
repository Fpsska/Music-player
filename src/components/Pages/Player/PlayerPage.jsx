import React from "react";
import { useSelector } from "react-redux";
import SvgTemplate from "../../Common/SvgTemplate";
import Bar from "../../Common/Bar/Bar";
import SliderPlayerList from "../../Common/Slider/SliderPlayerList";
import Navigation from "../../Navigation/Navigation";

const PlayerPage = () => {
  //
  const { isPlayerPage } = useSelector((state) => state.mainSlice);
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  //

  return (
    <div className="container">
      <div className="player">
        <div className="player__slider">
          <SliderPlayerList isPlayerPage={isPlayerPage} />
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
            <button
              className="player__button player__button--oder"
              type="button"
            >
              <SvgTemplate id="oder" />
            </button>
            <button
              className="player__button player__button--like"
              type="button"
            >
              <SvgTemplate id="like" />
            </button>
          </div>
          <div
            className={
              isLightTheme ? "player__time time light" : "player__time time"
            }
          >
            <span className="time__current">00:50</span>
            <span className="time__length">04:00</span>
          </div>
          <Bar />
        </div>
        <div className="page__navigation">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
