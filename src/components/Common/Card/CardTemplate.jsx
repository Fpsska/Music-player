import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Card = ({ image, artist, song, trackOrder }) => {
  const { isPlaylistPage, isPlayerPage, recomendedList } = useSelector(
    (state) => state.mainSlice
  );
  const artistElement = useRef();
  const albumElement = useRef();
  const songElement = useRef();

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
        src={
          isPlayerPage
            ? albumElement
            : require(`../../../assets/images/${image}`)
        }
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
        {/* {isPlayerPage ? songElement : "untitled"} */}
      </h2>
      <span
        ref={artistElement}
        className={
          isPlayerPage
            ? "card__subtitle card__subtitle--player subtitle"
            : "card__subtitle subtitle"
        }
      >
        {/* {isPlayerPage ? artistElement : "untitled"} */}
      </span>
    </div>
  );
};

export default Card;
