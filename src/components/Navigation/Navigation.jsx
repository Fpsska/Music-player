import React from "react";
import { useSelector } from "react-redux";
import Buttons from "../Common/Buttons/Buttons";
import Bar from "../Common/Bar/Bar";
import "./navigation.scss";

const Navigation = () => {
  const {
    isPlayerPage,
    currentTrackPreview,
    currentArtistName,
    currentTrackName,
  } = useSelector((state) => state.mainSlice);

  return (
    <div
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
                  src={currentTrackPreview}
                  alt="albom-preview"
                />
                <div className="navigation__informantion">
                  <span className="navigation__track-name title">
                    {currentTrackName}
                  </span>
                  <span className="navigation__artist-name subtitle">
                    {currentArtistName}
                  </span>
                </div>
              </div>
              <Buttons />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
