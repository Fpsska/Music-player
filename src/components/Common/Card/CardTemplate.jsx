import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Card = ({ image, artist, song, trackOrder }) => {
  const { isPlaylistPage, isPlayerPage, recomendedList } = useSelector(
    (state) => state.mainSlice
  );
  const artistName = useRef();
  const albumImage = useRef();
  const songName = useRef();
  const musicIndex = 1;
  //
  const loadMusic = (musicIndex) => {
    if (isPlayerPage) {
      songName.current.innerText = recomendedList[musicIndex - 1].song;
      artistName.current.innerText = recomendedList[musicIndex - 1].artist;
      albumImage.current.src = require(`../../../assets/images/${
        recomendedList[musicIndex - 1].image
      }`);
      // trackOrder.current.src = `../../../assets/audio${
      //   recomendedList[musicIndex - 1].audio
      // }`;
    }
  };
  useEffect(() => {
    loadMusic(musicIndex);
    console.log("mounted");
  }, []);
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
        ref={albumImage}
        className={
          isPlaylistPage
            ? "card__image card__image--playlist"
            : isPlayerPage
            ? "card__image card__image--player"
            : "card__image"
        }
        src={
          isPlayerPage ? albumImage : require(`../../../assets/images/${image}`)
        }
        alt="albom-preview"
      />
      <h2
        ref={songName}
        className={
          isPlayerPage
            ? "card__title card__title--player title"
            : "card__title title"
        }
      ></h2>
      <span
        ref={artistName}
        className={
          isPlayerPage
            ? "card__subtitle card__subtitle--player subtitle"
            : "card__subtitle subtitle"
        }
      ></span>
    </div>
  );
};

export default Card;
