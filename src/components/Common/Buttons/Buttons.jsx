import React, { useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SvgTemplate from "../SvgTemplate";
import {
  switchPauseStatus,
  setTrackPreview,
  setArtistName,
  setTrackName,
  setCurrentLineProgress,
  setCurrentTimeProgress,
  setSongDuration,
  setDuration,
  setOffsetTime,
} from "../../../app/mainSlice";
import "./buttons.scss";

const Buttons = () => {
  const {
    isPlayerPage,
    isPaused,
    isLoading,
    albumList,
    duration,
    offsetCurrentTime,
  } = useSelector((state) => state.mainSlice);
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  const dispatch = useDispatch();
  //
  const prevBtn = useRef();
  const pauseBtn = useRef();
  const nextBtn = useRef();
  const trackOrder = useRef();
  let musicIndex = Math.floor(Math.random() * albumList.length + 1);
  //
  const loadMusic = useCallback(
    (index) => {
      if (isLoading === false) {
        trackOrder.current.src = albumList[index - 1].preview;
        dispatch(setTrackPreview(albumList[index - 1].artist.picture_medium));
        dispatch(setArtistName(albumList[index - 1].artist.name));
        dispatch(setTrackName(albumList[index - 1].title));
      }
    },
    [musicIndex, albumList]
  );

  const defineTimeCount = (event) => {
    const { duration, currentTime } = event.srcElement;
    dispatch(setDuration(duration));
    //
    let totalSecond = Math.floor(duration % 60);
    let totalMinute = Math.floor(duration / 60);
    if (totalSecond < 10) {
      totalSecond = `0${totalSecond}`;
    }
    //
    let currentSecond = Math.floor(currentTime % 60);
    let currentMinute = Math.floor(currentTime / 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    dispatch(setCurrentTimeProgress(`${currentMinute}:${currentSecond}`));
    dispatch(setSongDuration(`${totalMinute}:${totalSecond}`));
    dispatch(setCurrentLineProgress((currentTime / duration) * 100));
  };

  const playMusic = () => {
    trackOrder.current.play();
  };

  const pauseMusic = () => {
    trackOrder.current.pause();
  };

  const nextSong = () => {
    musicIndex++;
    musicIndex > albumList.length
      ? (musicIndex = 1)
      : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
    dispatch(setCurrentLineProgress(0));
    dispatch(setCurrentTimeProgress(0));
    dispatch(setOffsetTime(0));
  };

  const prevSong = () => {
    musicIndex--;
    musicIndex < 1
      ? (musicIndex = albumList.length)
      : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
    dispatch(setCurrentLineProgress(0));
    dispatch(setCurrentTimeProgress(0));
    dispatch(setOffsetTime(0));
  };

  const defineButtonEvent = () => {
    dispatch(switchPauseStatus(!isPaused));
    !isPaused ? pauseMusic() : playMusic();
  };
  //
  useEffect(() => {
    loadMusic(musicIndex);
  }, [isLoading, albumList]);

  useEffect(() => {
    trackOrder.current.addEventListener("timeupdate", defineTimeCount);
    return () =>
      trackOrder.current.removeEventListener("timeupdate", defineTimeCount);
  }, [duration, offsetCurrentTime]);

  useEffect(() => {
    trackOrder.current.currentTime = offsetCurrentTime;
  }, [offsetCurrentTime]);
  //
  return (
    <nav
      className={`nav ${isPlayerPage ? "nav--player" : ""} ${
        isLightTheme ? "light" : ""
      }`}
    >
      <button
        ref={prevBtn}
        disabled={isLoading ? true : ""}
        onClick={prevSong}
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--prev"
            : "nav__button nav__button--prev"
        }
      >
        <SvgTemplate id="arrow_prev_icon" />
      </button>
      <button
        ref={pauseBtn}
        disabled={isLoading ? true : ""}
        onClick={defineButtonEvent}
        className={`nav__button ${isPlayerPage ? "nav__button--player" : ""} ${
          isPaused ? "nav__button--play" : "nav__button--pause"
        }`}
      >
        {isPaused ? <SvgTemplate id="play" /> : <SvgTemplate id="pause" />}
      </button>
      <button
        ref={nextBtn}
        disabled={isLoading ? true : ""}
        onClick={nextSong}
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--next"
            : "nav__button nav__button--next"
        }
      >
        <SvgTemplate id="arrow__next-icon" />
      </button>
      <audio
        className="player__audio"
        src={trackOrder}
        ref={trackOrder}
      ></audio>
    </nav>
  );
};

export default Buttons;
