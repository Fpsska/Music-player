import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SvgTemplate from "../SvgTemplate";
import {
  switchPauseStatus,
  setTrackPreview,
  setArtistName,
  setTrackName,
} from "../../../app/mainSlice";
import "./buttons.scss";

const Buttons = () => {
  const { isPlayerPage, isPaused, albumList } = useSelector(
    (state) => state.mainSlice
  );
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
      trackOrder.current.src = albumList[index - 1].preview;
      dispatch(setTrackPreview(albumList[index - 1].artist.picture_medium));
      dispatch(setArtistName(albumList[index - 1].artist.name));
      dispatch(setTrackName(albumList[index - 1].title));
    },
    [musicIndex]
  );

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
  };

  const prevSong = () => {
    musicIndex--;
    musicIndex < 1
      ? (musicIndex = albumList.length)
      : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
  };

  const defineButtonEvent = () => {
    dispatch(switchPauseStatus(!isPaused));
    !isPaused ? pauseMusic() : playMusic();
  };
  //
  return (
    <nav
      className={`nav ${isPlayerPage ? "nav--player" : ""} ${
        isLightTheme ? "light" : ""
      }`}
    >
      <button
        ref={prevBtn}
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
        onClick={defineButtonEvent}
        className={`nav__button ${isPlayerPage ? "nav__button--player" : ""} ${
          isPaused ? "nav__button--play" : "nav__button--pause"
        }`}
      >
        {isPaused ? <SvgTemplate id="play" /> : <SvgTemplate id="pause" />}
      </button>
      <button
        ref={nextBtn}
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
