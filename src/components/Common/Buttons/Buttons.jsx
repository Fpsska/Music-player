import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SvgTemplate from "../SvgTemplate";
import { switchPauseStatus } from "../../../app/mainSlice";
import "./buttons.scss";

const Buttons = ({ trackOrder, musicIndex }) => {
  const { isPlayerPage, isPaused } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  //
  const prevBtn = useRef();
  const pauseBtn = useRef();
  const nextBtn = useRef();
  //
  const nextSong = () => {
    musicIndex++;
    pauseMusic();
  };

  const playMusic = () => {
    trackOrder.current.play();
  };

  const pauseMusic = () => {
    trackOrder.current.pause();
  };

  const defineButtonEvent = () => {
    dispatch(switchPauseStatus(!isPaused));
    !isPaused ? pauseMusic() : playMusic();
  };

  //
  return (
    <nav className={isPlayerPage ? "nav nav--player" : "nav"}>
      <button
        ref={prevBtn}
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
    </nav>
  );
};

export default Buttons;
