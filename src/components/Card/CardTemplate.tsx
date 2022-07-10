import React from 'react';

import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { switchPlayerPageStatus } from '../../app/slices/mainSlice';

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
  } = useAppSelector(state => state.mainSlice);

  const {
    currentTrackPreview,
    currentArtistName,
    currentTrackName
  } = useAppSelector(state => state.playerSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goPlayerPage = (): void => {
    dispatch(switchPlayerPageStatus(true));
    navigate('player');
  };
  // 
  return (
    <div id={String(id)}  // Standard HTML Attributes (should be string)
      className={`card ${isPlaylistPage ? 'card--playlist' : isPlayerPage ? 'card--player' : isFavourite ? 'favourite' : ''}`}
    >
      <img
        className={`card__image ${isPlaylistPage ? 'card__image--playlist' : ''} ${isPlayerPage ? 'card__image--player' : ''}`}
        src={isPlayerPage ? currentTrackPreview : image}
        alt="albom-preview"
        onClick={() => !isPlaylistPage && !isPlayerPage && goPlayerPage()}
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
      {/* <br /> */}
      {/* <span style={{ color: '#fff' }}>{id}</span> */}
    </div>
  );
};

export default Card;
