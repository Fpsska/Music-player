import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IMG from "../../../assets/images/albom_preview-11.jpg";

const Card = ({ image, artist, track, song, trackOrder, musicIndex }) => {
  const { isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );
  const artistElement = useRef();
  const albumElement = useRef();
  const songElement = useRef();
  //
  const loadMusic = (musicIndex) => {
    // if (isPlayerPage) {
    //   songElement.current.innerText = recomendedList[musicIndex - 1].song;
    //   artistElement.current.innerText = recomendedList[musicIndex - 1].artist;
    //   albumElement.current.src = require(`../../../assets/images/${
    //     recomendedList[musicIndex - 1].image
    //   }`);
    //   trackOrder.current.src = require(`../../../assets/audio/${
    //     recomendedList[musicIndex - 1].audio
    //   }`);
    // }
    // return;
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
        // src={
        //   isPlayerPage
        //     ? albumElement
        //     : require(`../../../assets/images/${image}`)
        // }
        src={image}
        alt="albom-preview"
      />
      <h2
        ref={songElement}
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
