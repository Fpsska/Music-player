import React from 'react';

import { useAppSelector } from '../../app/hooks';

import Buttons from '../Buttons/Buttons';
import Bar from '../Bar/Bar';

import './navigation.scss';

// /. imports

const Navigation: React.FC = () => {

  const { isPlayerPage, isLoading } = useAppSelector(state => state.mainSlice);
  const {
    currentTrackPreview,
    currentArtistName,
    currentTrackName
  } = useAppSelector(state => state.playerSlice);
  // 
  return (
    <div
      className={isPlayerPage ? 'navigation navigation--player' : 'navigation'}
    >
      <div
        className={
          isPlayerPage
            ? 'navigation__wrapper navigation__wrapper--player'
            : 'navigation__wrapper'
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
                  <span
                    className="navigation__track-name slide"
                    title={currentTrackName}
                  >
                    {isLoading ? (
                      <div className="loading loading--nav">
                        <div className="loading__text loading__text--track animated"></div>
                      </div>
                    ) : (
                      currentTrackName
                    )}
                  </span>
                  <span
                    className="navigation__artist-name subtitle"
                    title={currentArtistName}
                  >
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