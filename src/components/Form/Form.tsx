import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SvgTemplate from "../Common/SvgTemplate";
import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
  switchSearchPageStatus
} from "../../app/slices/mainSlice";
import { switchBurgerStatus } from "../../app/slices/burgerSlice";
import { RootState } from "../../app/store";
import "./form.scss";

const Form: React.FC = () => {
  const { isPlaylistPage, isPlayerPage, isSearchPage, isLoading } = useSelector(
    (state: RootState) => state.mainSlice
  );
  const { isBurgerOpen, isLightTheme } = useSelector(
    (state: RootState) => state.burgerSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 
  const goBack = (): void => {
    setTimeout(() => {
      navigate("/Music-player");
      dispatch(switchPlaylistPageStatus(false));
      dispatch(switchPlayerPageStatus(false));
      dispatch(switchSearchPageStatus(false));
    }, 200);
  };

  const openBurger = (): void => {
    dispatch(switchBurgerStatus(true));
  };

  const relocateToSearchPage = (e: React.SyntheticEvent): void => {
    console.log("SUBMITED")
    setTimeout(() => {
      e.preventDefault()
      dispatch(switchSearchPageStatus(true))
      navigate("search");
    }, 1000);
  }
  // 
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
      ) : isSearchPage ? (
        <div className="header__section">
          <button
            className="header__button header__button--search"
            type="button"
            onClick={goBack}
          >
            <SvgTemplate id="arrow-back" />
          </button>
          <form className={isLightTheme ? "form light" : "form"} action="#">
            <div className="form__search">
              <input
                className="form__input"
                type="text"
                disabled={isLoading ? true : isBurgerOpen ? true : false}
              />
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
        </div>
      )
        :
        (
          <div className="header__section">
            <button
              className="header__button header__button--menu"
              type="button"
              onClick={openBurger}
            >
              <SvgTemplate id="menu" />
            </button>
            <form className={isLightTheme ? "form light" : "form"} action="#" onSubmit={relocateToSearchPage}>
              <div className="form__search">
                <input
                  className="form__input"
                  type="text"
                  disabled={isLoading ? true : isBurgerOpen ? true : false}
                />
                <button
                  onClick={(e) => relocateToSearchPage(e)}
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
          </div>
        )}
    </>
  );
};

export default Form;
