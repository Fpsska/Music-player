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
                <>
                  {isLoading ? (
                    <div className="loading">
                      <div className="loading__image animated"></div>
                    </div>
                  ) : (
                    <img
                      className="navigation__image"
                      src={currentTrackPreview}
                      alt="albom-preview"
                    />
                  )}
                </>
                <div className="navigation__informantion">
                  <span className="navigation__track-name title">
                    {isLoading ? (
                      <div className="loading">
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
