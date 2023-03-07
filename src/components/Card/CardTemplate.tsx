import React from 'react';

import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    setCurrentCardID,
    setCurrentPlayerData
} from '../../app/slices/playerSlice';

import { determineCurrentPlayerData } from '../../helpers/determineCurrentPlayerData';

import { useLocationData } from '../../hooks/useLocationData';
import { useMusicController } from '../../hooks/useMusicController';

// /. imports

interface CardPropTypes {
    id: number;
    image: string;
    artist: string;
    track: string;
    isFavourite: boolean;
}

// /. interfaces

const Card: React.FC<CardPropTypes> = (props: CardPropTypes) => {
    const { id, image, artist, track, isFavourite } = props;

    const { pagesStatuses } = useAppSelector(state => state.mainSlice);

    const {
        currentTrackPreview,
        currentArtistName,
        currentTrackName,
        musicIndex,
        currentPlayerData
    } = useAppSelector(state => state.playerSlice);

    const { state } = useLocationData();
    // console.log(state);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const audioEl = document.querySelector(
        '.player__audio'
    ) as HTMLAudioElement;
    const { loadMusic } = useMusicController(audioEl);

    const goPlayerPage = (): void => {
        navigate('player');
        dispatch(setCurrentCardID(id));
        dispatch(
            setCurrentPlayerData({
                data: currentPlayerData,
                id
            })
        );
        loadMusic(0);
    };

    //
    return (
        <div
            id={String(id)} // Standard HTML Attributes (should be string)
            className={`card ${
                pagesStatuses.isPlaylistPage
                    ? 'card--playlist'
                    : pagesStatuses.isPlayerPage
                    ? 'card--player'
                    : isFavourite
                    ? 'favourite'
                    : ''
            }`}
        >
            <img
                className={`card__image ${
                    pagesStatuses.isPlaylistPage ? 'card__image--playlist' : ''
                } ${pagesStatuses.isPlayerPage ? 'card__image--player' : ''}`}
                src={pagesStatuses.isPlayerPage ? currentTrackPreview : image}
                alt="albom-preview"
                onClick={() =>
                    !pagesStatuses.isPlaylistPage &&
                    !pagesStatuses.isPlayerPage &&
                    goPlayerPage()
                }
            />
            <h2
                className={
                    pagesStatuses.isPlayerPage
                        ? 'card__title card__title--player slide'
                        : 'card__title title'
                }
                title={currentTrackName}
            >
                {pagesStatuses.isPlayerPage ? currentTrackName : track}
            </h2>
            <span
                className={
                    pagesStatuses.isPlayerPage
                        ? 'card__subtitle card__subtitle--player subtitle'
                        : 'card__subtitle subtitle'
                }
            >
                {pagesStatuses.isPlayerPage ? currentArtistName : artist}
            </span>
            <br />
            <span style={{ color: '#fff' }}>{id}</span>
        </div>
    );
};

export default Card;
