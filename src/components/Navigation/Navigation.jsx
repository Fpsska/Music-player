import React from "react";
import { useSelector } from "react-redux";
import Buttons from "../Common/Buttons/Buttons";
import Bar from "../Common/Bar/Bar";
import "./navigation.scss";

const Navigation = () => {
  const {
    isPlayerPage,
    isLoading,
    currentTrackPreview,
    currentArtistName,
    currentTrackName,
  } = useSelector((state) => state.mainSlice);
  const { isLightTheme } = useSelector((state) => state.burgerSlice);

  return (
    <div
      className={`navigation ${isPlayerPage ? "navigation--player" : ""} ${isLightTheme ? "light" : ""}`}
    >
      <div
        className={
          isPlayerPage
            ? "navigation__wrapper navigation__wrapper--player"
            : "navigation__wrapper"
        }
      >
        <Bar />
        <div className="navigation__bar">
          {isPlayerPage ? (
            <></>
          ) : (
            <div className="navigation__description">
              <>
                {isLoading ? (
                  <div className="loading">
                    <div className="loading__preview loading__preview--nav animated"></div>
                  </div>
                ) : isPlayerPage ? (
                  <></>
                ) : (
                  <img
                    className="navigation__image"
                    src={currentTrackPreview}
                    alt="album-preview"
                  />
                )}
              </>
              {isPlayerPage ? (
                <></>
              ) : (
                <div className="navigation__informantion">
                  <span className="navigation__track-name title slide">
                    {isLoading ? (
                      <div className="loading loading--nav">
                        <div className="loading__text loading__text--track animated"></div>
                      </div>
                    ) : (
                      currentTrackName
                    )}
                  </span>
                  <span className="navigation__artist-name subtitle">
                    {isLoading ? (
                      <div className="loading loading--nav">
                        <div className="loading__text loading__text--artist animated"></div>
                      </div>
                    ) : (
                      currentArtistName
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
