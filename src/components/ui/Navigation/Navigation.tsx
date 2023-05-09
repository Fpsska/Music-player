import React from 'react';

import { useNavigate } from 'react-router';

import previewImageWebp from 'assets/images/preview_placeholder.webp';

import placeholderImagePng from 'assets/images/preview_placeholder.png';

import { useAppSelector } from 'app/hooks';

import Buttons from '../Buttons/Buttons';
import Bar from '../DurationBar/DurationBar';

import './navigation.scss';

// /. imports

const Navigation: React.FC = () => {
    const { pagesStatuses, isLoading } = useAppSelector(
        state => state.mainSlice
    );
    const { currentTrackPreview, currentArtistName, currentTrackName } =
        useAppSelector(state => state.playerSlice);

    const navigate = useNavigate();

    // /. hooks

    const goPlayerPage = (): void => {
        navigate('player');
    };

    // /. functions

    return (
        <div
            className={
                pagesStatuses.isPlayerPage
                    ? 'navigation navigation--player'
                    : 'navigation'
            }
        >
            <div
                className={
                    pagesStatuses.isPlayerPage
                        ? 'navigation__wrapper navigation__wrapper--player'
                        : 'navigation__wrapper'
                }
            >
                <Bar />
                <div className="navigation__bar">
                    {pagesStatuses.isPlayerPage ? (
                        <></>
                    ) : (
                        <div className="navigation__description">
                            <>
                                {isLoading ? (
                                    <div className="loading">
                                        <div className="loading__preview loading__preview--nav animated"></div>
                                    </div>
                                ) : pagesStatuses.isPlayerPage ? (
                                    <></>
                                ) : (
                                    <>
                                        {currentTrackPreview ? (
                                            <div className="navigation__image-wrapper">
                                                <img
                                                    className="navigation__image"
                                                    src={currentTrackPreview}
                                                    alt="album-preview"
                                                    onClick={goPlayerPage}
                                                    onError={(
                                                        e: React.SyntheticEvent<HTMLImageElement>
                                                    ) => {
                                                        e.currentTarget.onerror =
                                                            null;
                                                        e.currentTarget.src =
                                                            placeholderImagePng;
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <picture className="navigation__image-wrapper">
                                                <source
                                                    srcSet={previewImageWebp}
                                                    type="image/webp"
                                                />
                                                <img
                                                    className="navigation__image"
                                                    src={placeholderImagePng}
                                                    alt="album-preview"
                                                    onClick={goPlayerPage}
                                                />
                                            </picture>
                                        )}
                                    </>
                                )}
                            </>
                            {pagesStatuses.isPlayerPage ? (
                                <></>
                            ) : (
                                <div className="navigation__informantion">
                                    <span
                                        className="navigation__track-name slide"
                                        title={currentTrackName}
                                        onClick={goPlayerPage}
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
                                        onClick={goPlayerPage}
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
