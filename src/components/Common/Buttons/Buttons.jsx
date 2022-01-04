import React from "react";
import SvgTemplate from "../SvgTemplaye";
import "./buttons.scss";

const Buttons = () => {
  return (
    <nav className="nav">
      <button className="nav__button">
        <SvgTemplate id="arrow_prev_icon" />
      </button>
      <button className="nav__button">
        <SvgTemplate id="pause" />
      </button>
      <button className="nav__button">
        <SvgTemplate id="arrow_next-icon" />
      </button>
    </nav>
  );
};

export default Buttons;
