import React, { useEffect, useRef } from "react";
import SvgTemplate from "../../Common/SvgTemplate";
import Bar from "../../Common/Bar/Bar";
import SliderPlayerList from "../../Common/Slider/SliderPlayerList";
import Navigation from "../../Navigation/Navigation";
import { useSelector } from "react-redux";

// import song from "../../../assets/audio/track-2.mp3";

const PlayerPage = () => {
  //
  const { isPlayerPage } = useSelector((state) => state.mainSlice);
  const trackOrder = useRef();
  //
  const musicIndex = 1;
  //

  const loadMusic = (musicIndex) => {
    if (isPlayerPage) {
      songElement.current.innerText = recomendedList[musicIndex - 1].song;
      artistElement.current.innerText = recomendedList[musicIndex - 1].artist;
      albumElement.current.src = require(`../../../assets/images/${
        recomendedList[musicIndex - 1].image
      }`);
      trackOrder.current.src = `../../../assets/audio${
        recomendedList[musicIndex - 1].audio
      }`;
    }
  };
  useEffect(() => {
    loadMusic(musicIndex);
    console.log("mounted");
  }, []);
  //

  return (
    <div className="player">
      <div className="player__slider">
        <SliderPlayerList isPlayerPage={isPlayerPage} trackOrder={trackOrder} />
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
      <div className="page__navigation">
        <Navigation trackOrder={trackOrder} />
      </div>
    </div>
  );
};

export default PlayerPage;
