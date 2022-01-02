import React from "react";
import SvgTemplate from "../Common/SvgTemplaye";
import albomPreview from "../../assets/images/albom_preview-6.png";
import "./navigation.scss";

const Navigation = () => {
  return (
    <footer className="navigation">
      <div className="navigation__wrapper">
        <div className="navigation__description">
          <img
            className="navigation__image"
            src={albomPreview}
            alt="albom-preview"
          />
          <div className="navigation__informantion">
            <span className="navigation__track-name title">Chaff Dust</span>
            <span className="navigation__artist-name subtitle">HYONNA</span>
          </div>
        </div>
        <div className="navigation__buttons">
          <button className="navigation__button">
            <SvgTemplate id="arrow_prev_icon" />
          </button>
          <button className="navigation__button">
            <SvgTemplate id="pause" />
          </button>
          <button className="navigation__button">
            <SvgTemplate id="arrow_next-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Navigation;
