import React from "react";
import Buttons from "../Common/Buttons/Buttons";
import Bar from "../Common/Bar/Bar";
import albomPreview from "../../assets/images/albom_preview-6.png";
import "./navigation.scss";

const Navigation = () => {
  return (
    <footer className="navigation">
      <div className="navigation__wrapper">
        <Bar />
        <div className="navigation__bar">
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
          <Buttons />
        </div>
      </div>
    </footer>
  );
};

export default Navigation;
