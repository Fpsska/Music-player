import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { RootState } from '../../app/store';

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

  const {
    id,
    image,
    artist,
    track,
    isFavourite
  } = props;


  const {
    isPlaylistPage,
    isPlayerPage
  } = useAppSelector((state: RootState) => state.mainSlice);

  const {
    currentTrackPreview,
    currentArtistName,
    currentTrackName
  } = useAppSelector((state: RootState) => state.playerSlice);

  return (
    <div id={String(id)}  // Standard HTML Attributes
      className={`card ${isPlaylistPage ? 'card--playlist' : ''} ${isPlayerPage ? 'card--player' : ''} ${isFavourite ? 'favourite' : ''}`}
    >
      <img
        className={
          isPlaylistPage
            ? 'card__image card__image--playlist'
            : isPlayerPage
              ? 'card__image card__image--player'
              : 'card__image'
        }
        src={isPlayerPage ? currentTrackPreview : image}
        alt="albom-preview"
      />
      <h2
        className={
          isPlayerPage
            ? 'card__title card__title--player slide'
            : 'card__title title'
        }
        title={currentTrackName}
      >
        {isPlayerPage ? currentTrackName : track}
      </h2>
      <span
        className={
          isPlayerPage
            ? 'card__subtitle card__subtitle--player subtitle'
            : 'card__subtitle subtitle'
        }
      >
        {isPlayerPage ? currentArtistName : artist}
      </span>
    </div>
  );
};

export default Card;
