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
    <form className="form" action="#">
      <>
        {isPlaylistPage ? (
          <button className="form__button" type="button" onClick={goBack}>
            <SvgTemplate id="arrow-back" />
          </button>
        ) : isPlayerPage ? (
          <button className="form__button" type="button" onClick={goBack}>
            <SvgTemplate id="arrow-back" />
          </button>
        ) : (
          <button className="form__button" type="button">
            <SvgTemplate id="menu" />
          </button>
        )}
      </>
      <>
        {isPlaylistPage ? (
          <></>
        ) : isPlayerPage ? (
          <h1
            className="page__title page__title--player title"
            onClick={goHomePage}
          >
            <Link to="/Music-player">Playing Now</Link>
          </h1>
        ) : (
          <input className="form__input" type="text" />
        )}
      </>
      <>
        {isPlaylistPage ? (
          <button className="form__button" type="button">
            <SvgTemplate id="mixer" />
          </button>
        ) : isPlayerPage ? (
          <></>
        ) : (
          <button className="form__button" type="submit">
            <SvgTemplate id="search" />
          </button>
        )}
      </>
    </form>
  );
};

export default Form;
