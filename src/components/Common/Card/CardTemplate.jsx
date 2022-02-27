import React from "react";
import { useSelector } from "react-redux";

const Card = ({ image, artist, track }) => {
  const {
    isPlaylistPage,
    isPlayerPage,
    currentTrackPreview,
    currentArtistName,
    currentTrackName,
  } = useSelector((state) => state.mainSlice);
  const { isLightTheme } = useSelector(state => state.burgerSlice)

  return (
    <div
      className={`card ${isPlaylistPage ? "card--playlist" : ""} ${isPlayerPage ? "card--player" : ""} ${isLightTheme ? "light" : ""}`}
    >
      <img
        className={
          isPlaylistPage
            ? "card__image card__image--playlist"
            : isPlayerPage
              ? "card__image card__image--player"
              : "card__image"
        }
        src={isPlayerPage ? currentTrackPreview : image}
        alt="albom-preview"
      />
      <h2
        className={
          isPlayerPage
            ? "card__title card__title--player slide"
            : "card__title title"
        }
        title={currentTrackName}
      >
        {isPlayerPage ? currentTrackName : track}
      </h2>
      <span
        className={
          isPlayerPage
            ? "card__subtitle card__subtitle--player subtitle"
            : "card__subtitle subtitle"
        }
      >
        {isPlayerPage ? currentArtistName : artist}
      </span>
    </div>
  );
};

export default Card;