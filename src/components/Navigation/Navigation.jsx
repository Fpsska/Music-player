import React from "react";
import { useSelector } from "react-redux";
import Buttons from "../Common/Buttons/Buttons";
import Bar from "../Common/Bar/Bar";
import albomPreview from "../../assets/images/albom_preview-6.png";
import "./navigation.scss";

const Navigation = () => {
  const { isPlayerPage } = useSelector((state) => state.mainSlice);

  return (
    <footer
      className={isPlayerPage ? "navigation navigation--player" : "navigation"}
    >
      <div
        className={
          isPlayerPage
            ? "navigation__wrapper navigation__wrapper--player"
            : "navigation__wrapper"
        }
      >
        {isPlayerPage ? (
          <div className="navigation__section">
            <Buttons />
          </div>
        ) : (
          <>
            <Bar />
            <div className="navigation__bar">
              <div className="navigation__description">
                <img
                  className="navigation__image"
                  src={albomPreview}
                  alt="albom-preview"
                />
                <div className="navigation__informantion">
                  <span className="navigation__track-name title">
                    Chaff Dust
                  </span>
                  <span className="navigation__artist-name subtitle">
                    HYONNA
                  </span>
                </div>
              </div>
              <Buttons />
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Navigation;
