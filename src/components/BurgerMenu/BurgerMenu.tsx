import React, { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  switchBurgerStatus,
  swithTheme,
  switchInformationStatus,
  switchContactInfoStatus,
  switchFaqsInfoStatus,
} from "../../app/burgerSlice";
import { switchSearchPageStatus, switchPlaylistPageStatus, switchPlayerPageStatus } from "../../app/mainSlice";
import { Spring, animated } from "react-spring";
import SvgTemplate from "../Common/SvgTemplate";
import Details from "../Details/Details";
import "./burger.scss";
import { RootState } from "../../app/store";

const BurgerMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLightTheme, isCurtainVisible, isInformationVisible } = useSelector(
    (state: RootState) => state.burgerSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //
  const closeBurger = (): void => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      dispatch(switchBurgerStatus(false));
      dispatch(switchInformationStatus(false));
    }, 400);
  };

  const displaySocial = (): void => {
    dispatch(switchInformationStatus(true));
    dispatch(switchContactInfoStatus(true));
    dispatch(switchFaqsInfoStatus(false));
  };
  const displayFAQs = (): void => {
    dispatch(switchInformationStatus(true));
    dispatch(switchFaqsInfoStatus(true));
    dispatch(switchContactInfoStatus(false));
  };

  const keyHandler = (e: KeyboardEvent): void => {
    if (e.code === "Escape") {
      closeBurger();
      setTimeout(() => {
        dispatch(switchInformationStatus(false));
      }, 450);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [isVisible]);

  const changeTheme = (): void => {
    dispatch(swithTheme(!isLightTheme));
  };

  const relocateToSearchPage = (): void => {
    setTimeout(() => {
      navigate("search");
      dispatch(switchBurgerStatus(false))
      dispatch(switchSearchPageStatus(true))
    }, 200);
  }
  //
  return (
    <>
      <Spring
        from={{ transform: "translateX(-300px)" }}
        to={{ transform: "translateX(0px)" }}
        config={{ duration: 360 }}
        reverse={isVisible}
        delay={100}
      >
        {(styles) => (
          <animated.div className="burger" style={styles}>
            <>
              {isCurtainVisible ? (
                <animated.div
                  className="burger__background"
                  style={styles}
                ></animated.div>
              ) : (
                <></>
              )}
            </>
            <div
              className={
                isLightTheme ? "burger__wrapper light" : "burger__wrapper"
              }
            >
              <div
                className={
                  isLightTheme
                    ? "burger__navigation light"
                    : "burger__navigation"
                }
              >
                <button
                  className="burger__button burger__button--close"
                  type="button"
                  onClick={closeBurger}
                >
                  <SvgTemplate id="close" />
                </button>
                <button
                  className="burger__button burger__button--theme"
                  type="button"
                  onClick={changeTheme}
                >
                  <SvgTemplate id="theme" />
                </button>
              </div>
              <nav className="burger__menu">
                <ul
                  className={
                    isLightTheme
                      ? "menu light"
                      : isInformationVisible
                        ? "menu opened"
                        : "menu"
                  }
                >
                  <li className="menu__item">
                    <SvgTemplate id="profile" />
                    <a
                      className="menu__link"
                      href="https://github.com/Fpsska"
                      target="_blank"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="like" />
                    <span className="menu__link" onClick={relocateToSearchPage}>
                      Liked Songs
                    </span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="language" />
                    <span className="menu__link">Language</span>
                  </li>
                  <li className="menu__item" onClick={displaySocial}>
                    <SvgTemplate id="message" />
                    <span className="menu__link">Contact us</span>
                  </li>
                  <li className="menu__item" onClick={displayFAQs}>
                    <SvgTemplate id="faqs" />
                    <span className="menu__link">FAQs</span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="main-settings" />
                    <span className="menu__link">Settings</span>
                  </li>
                </ul>
                {isInformationVisible ? <Details /> : <></>}
              </nav>
            </div>
          </animated.div>
        )}
      </Spring>
    </>
  );
};

export default BurgerMenu;
