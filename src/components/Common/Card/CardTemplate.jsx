import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IMG from "../../../assets/images/albom_preview-6.png";

const Card = ({ image, artist, track, trackOrder, musicIndex }) => {
  const { isPlaylistPage, isPlayerPage, albumList } = useSelector(
    (state) => state.mainSlice
  );
  const artistElement = useRef();
  const albumElement = useRef();
  const trackElement = useRef();
  //

  const loadMusic = (musicIndex) => {
    if (isPlayerPage) {
      // trackElement.current.innerText = albumList[musicIndex - 1].song;
      artistElement.current.innerText = albumList[musicIndex - 1].artist;
      // albumElement.current.src = require(`../../../assets/images/${
      //   albumList[musicIndex - 1].image
      // }`);
      // albumElement.current.src = albumList[musicIndex - 1].artist.picture_medium
      // trackOrder.current.src = require(`../../../assets/audio/${
      //   albumList[musicIndex - 1].audio
      // }`);
    }
    return;
  };
  //
  useEffect(() => {
    loadMusic(musicIndex);
  }, [isPlayerPage]);
  //

  return (
    <div
      className={
        isPlaylistPage
          ? "card card--playlist"
          : isPlayerPage
          ? "card card--player"
          : "card"
      }
    >
      <img
        ref={albumElement}
        className={
          isPlaylistPage
            ? "card__image card__image--playlist"
            : isPlayerPage
            ? "card__image card__image--player"
            : "card__image"
        }
        src={isPlayerPage ? albumElement : image}
        // src={image}
        alt="albom-preview"
      />
      <h2
        ref={trackElement}
        className={
          isPlayerPage
            ? "card__title card__title--player title"
            : "card__title title"
        }
      >
        {track}
      </h2>
      <span
        ref={artistElement}
        className={
          isPlayerPage
            ? "card__subtitle card__subtitle--player subtitle"
            : "card__subtitle subtitle"
        }
      >
        {artist}
      </span>
    </div>
  );
};

export default Card;
