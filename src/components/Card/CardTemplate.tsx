import React, { useEffect, useState } from 'react';

import { BsHeart } from 'react-icons/bs';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { addToLikedAlbum } from '../../app/slices/playerSlice';

// /. imports

interface CardPropTypes {
  id: number;
  card: any;
  image: string;
  artist: string;
  track: string;
  isFavourite: boolean;
}

// /. interfaces

const Card: React.FC<CardPropTypes> = (props: CardPropTypes) => {

  const {
    id,
    card,
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
    currentTrackName,
    likedData
  } = useAppSelector(state => state.playerSlice);

  const [isAlreadyAdded, setAddedStatus] = useState<boolean>(false);

  useEffect(() => {
    likedData.some(item => item.id === id) ? setAddedStatus(true) : setAddedStatus(false);
  }, [likedData]);

  const dispatch = useAppDispatch();

  const addToFavorite = (): void => {
    dispatch(addToLikedAlbum(card));
    console.log('added')
  };

  // 
  return (
    <div id={String(id)}  // Standard HTML Attributes (should be string)
      className={`card ${isPlaylistPage ? 'card--playlist' : isPlayerPage ? 'card--player' : isFavourite ? 'favourite' : ''}`}
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
      <>
        {
          isPlayerPage &&
          <button
            className="card__button card__button--like"
            type="button"
            onClick={() => !isAlreadyAdded && addToFavorite()}
          >
            <BsHeart size={18} color={'#8996b8'} />
          </button>
        }
      </>
    </div>
  );
};

export default Card;
