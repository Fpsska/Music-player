import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import SvgTemplate from "../SvgTemplate";
import "./buttons.scss";

const Buttons = ({trackOrder}) => {
  const { isPlayerPage } = useSelector((state) => state.mainSlice);
  const [isPaused, setPausedStatus] = useState(true);

  const prevBtn = useRef();
  const pauseBtn = useRef();
  const nextBtn = useRef();

  const playMusic = () => {
    console.log("play func");
  };

  const pauseMusic = () => {
    trackOrder.current.play()
    console.log(trackOrder);
    console.log("pause func");
  };

  const defineEvent = () => {
    trackOrder.current.pause()
    setPausedStatus(!isPaused);
    isPaused ? pauseMusic() : playMusic();
  };

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
        onClick={defineEvent}
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--pause"
            : "nav__button nav__button--pause"
        }
      >
        <SvgTemplate id="pause" />
      </button>
      <button
        ref={nextBtn}
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--next"
            : "nav__button nav__button--next"
        }
      >
        <SvgTemplate id="arrow_next-icon" />
      </button>
    </nav>
  );
};

export default Buttons;
