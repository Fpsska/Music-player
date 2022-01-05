import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { switchPlayerPageStatus } from "../../../app/mainSlice";

const Card = ({ image, artist, song }) => {
  const { isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goPlayerPage = () => {
    dispatch(switchPlayerPageStatus(true));
    navigate("player");
  };
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
        className={
          isPlaylistPage
            ? "card__image card__image--playlist"
            : isPlayerPage
            ? "card__image card__image--player"
            : "card__image"
        }
        src={require(`../../../assets/images/${image}`)}
        alt="albom-preview"
        onClick={goPlayerPage}
      />
      <h2
        className={
          isPlayerPage
            ? "card__title card__title--player title"
            : "card__title title"
        }
      >
        {song}
      </h2>
      <span
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
