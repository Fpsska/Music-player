import React from 'react';
import { useSelector } from 'react-redux';

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
    isPlayerPage,
    currentTrackPreview,
    currentArtistName,
    currentTrackName
  } = useSelector((state: RootState) => state.mainSlice);
  const { isLightTheme } = useSelector((state: RootState) => state.burgerSlice);

  return (
    <div id={String(id)}  // Standard HTML Attributes
      className={`card ${isPlaylistPage ? 'card--playlist' : ''} ${isPlayerPage ? 'card--player' : ''} ${isLightTheme ? 'light' : ''} ${isFavourite ? 'favourite' : ''}`}
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
