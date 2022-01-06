import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SvgTemplate from "../SvgTemplaye";
import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
} from "../../../app/mainSlice";
import "./form.scss";

const Form = () => {
  const { isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate("/Music-player");
    dispatch(switchPlaylistPageStatus(false));
    dispatch(switchPlayerPageStatus(false));
  };

  const goHomePage = () => {
    navigate("/Music-player");
    dispatch(switchPlayerPageStatus(false));
  };
  return (
    <>
      {isPlaylistPage ? (
        <div className="header__section">
          <button
            className="header__button header__button--playlist"
            type="button"
            onClick={goBack}
          >
            <SvgTemplate id="arrow-back" />
          </button>
          <button
            className="header__button header__button--playlist"
            type="button"
          >
            <SvgTemplate id="mixer" />
          </button>
        </div>
      ) : isPlayerPage ? (
        <div className="header__section header__section--player">
          <button
            className="header__button header__button--player"
            type="button"
            onClick={goBack}
          >
            <SvgTemplate id="arrow-back" />
          </button>
          <h1
            className="page__title page__title--player title"
            onClick={goHomePage}
          >
            <Link to="/Music-player">Playing Now</Link>
          </h1>
        </div>
      ) : (
        <form className="form" action="#">
          <button className="form__button form__button--menu" type="button">
            <SvgTemplate id="menu" />
          </button>
          <div className="form__search">
            <input className="form__input" type="text" />
            <button className="form__button form__button--search" type="button">
              <SvgTemplate id="search" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
