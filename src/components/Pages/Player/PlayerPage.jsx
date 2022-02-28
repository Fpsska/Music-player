import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchMutedStatus } from "../../../app/mainSlice";
import SvgTemplate from "../../Common/SvgTemplate";
import SliderPlayerList from "../../Slider/SliderPlayerList";

const PlayerPage = () => {
  //
  const {
    isPlayerPage,
    isLoading,
    songDuration,
    currentTimeProgress,
    isAudioMuted,
  } = useSelector((state) => state.mainSlice);
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  const dispatch = useDispatch();
  //
  const muteVolume = () => {
    dispatch(switchMutedStatus(!isAudioMuted));
  };
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
              className="player__button player__button--volume volume"
              type="button"
              onClick={muteVolume}
            >
              <SvgTemplate id="volume" />
              <span
                className={
                  isAudioMuted ? "volume__label muted" : "volume__label"
                }
              ></span>
              <span
                className={
                  isAudioMuted ? "volume__label muted" : "volume__label"
                }
              ></span>
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
            <span className="time__current">
              {isLoading ? "00:00" : currentTimeProgress}
            </span>
            <span className="time__length">
              {isLoading ? "00:00" : songDuration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
