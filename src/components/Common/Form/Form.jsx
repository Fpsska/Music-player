import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SvgTemplate from "../SvgTemplate";
import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
} from "../../../app/mainSlice";
import { switchBurgerStatus } from "../../../app/burgerSlice";
import "./form.scss";

const Form = () => {
  const { isPlaylistPage, isPlayerPage } = useSelector(
    (state) => state.mainSlice
  );
  const { isBurgerOpen, isLightTheme } = useSelector(
    (state) => state.burgerSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    setTimeout(() => {
      navigate("/Music-player");
      dispatch(switchPlaylistPageStatus(false));
      dispatch(switchPlayerPageStatus(false));
    }, 200);
  };

  const openBurger = () => {
    dispatch(switchBurgerStatus(true));
  };
  return (
    <>
      {isPlaylistPage ? (
        <div
          className={isLightTheme ? "header__section light" : "header__section"}
        >
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
          <h1 className="header__title">Playing Now</h1>
        </div>
      ) : (
        <form className={isLightTheme ? "form light" : "form"} action="#">
          <button
            className="form__button form__button--menu"
            type="button"
            onClick={openBurger}
          >
            <SvgTemplate id="menu" />
          </button>
          <div className="form__search">
            <input className="form__input" type="text" />
            <button
              className={
                isBurgerOpen
                  ? "form__button form__button--search opacity"
                  : "form__button form__button--search"
              }
              type="button"
            >
              <SvgTemplate id="search" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
