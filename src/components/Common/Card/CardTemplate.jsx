import React from "react";

const Card = ({ image, artist, song }) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={require(`../../../assets/images/${image}`)}
        alt="albom-preview"
      />
      <h2 className="card__title title">{song}</h2>
      <span className="card__subtitle subtitle">{artist}</span>
    </div>
  );
};

export default Card;
