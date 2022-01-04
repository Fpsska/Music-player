import React from "react";
import { useSelector } from "react-redux";

const Card = ({ image, artist, song }) => {
  const { isPlaylistPage } = useSelector((state) => state.mainSlice);
  return (
    <div className={isPlaylistPage ? "card card--playlist" : "card"}>
      <img
        className={
          isPlaylistPage ? "card__image card__image--playlist" : "card__image"
        }
        src={require(`../../../assets/images/${image}`)}
        alt="albom-preview"
      />
      <h2 className="card__title title">{song}</h2>
      <span className="card__subtitle subtitle">{artist}</span>
    </div>
  );
};

export default Card;
