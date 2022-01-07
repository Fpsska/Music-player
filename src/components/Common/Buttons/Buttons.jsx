import React from "react";
import { useSelector } from "react-redux";
import SvgTemplate from "../SvgTemplate";
import "./buttons.scss";

const Buttons = () => {
  const { isPlayerPage } = useSelector((state) => state.mainSlice);

  return (
    <nav className={isPlayerPage ? "nav nav--player" : "nav"}>
      <button
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--prev"
            : "nav__button nav__button--prev"
        }
      >
        <SvgTemplate id="arrow_prev_icon" />
      </button>
      <button
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--pause"
            : "nav__button nav__button--pause"
        }
      >
        <SvgTemplate id="pause" />
      </button>
      <button
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
