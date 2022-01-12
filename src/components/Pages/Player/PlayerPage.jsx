import React, { useEffect, useRef } from "react";
import SvgTemplate from "../../Common/SvgTemplate";
import Bar from "../../Common/Bar/Bar";
import Slider from "../../Common/Slider/Slider";
import { useSelector } from "react-redux";

// import song from "../../../assets/audio/track-2.mp3";

const PlayerPage = () => {
  //
  const { isPlayerPage } = useSelector((state) => state.mainSlice);
  const trackOrder = useRef();
  //

  return (
    <div className="player">
      <div className="player__slider">
        <Slider isPlayerPage={isPlayerPage} trackOrder={trackOrder} />
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
          <button className="player__button player__button--like" type="button">
            <SvgTemplate id="like" />
          </button>
        </div>
        <div className="player__time time">
          <span className="time__current">00:50</span>
          <span className="time__length">04:00</span>
        </div>
        <Bar />
      </div>
      <audio
        className="player__audio"
        ref={trackOrder}
        src={trackOrder}
      ></audio>
    </div>
  );
};

export default PlayerPage;
