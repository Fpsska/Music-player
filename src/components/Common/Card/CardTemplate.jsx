import React from "react";
import img from "../../../assets/images/albom_preview-1.png"

const Card = () => {
  return (
    <div className="card">
      <img className="card__image" src={img} alt="albom-preview" />
      <h2 className="card__title title">Monsters Go Bump</h2>
      <span className="card__subtitle subtitle">ERIKA RECINOS</span>
    </div>
  );
};

export default Card;
