import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { switchBurgerStatus, swithTheme } from "../../../app/burgerSlice";
import { Spring, animated } from "react-spring";
import SvgTemplate from "../SvgTemplate";
import "./burger.scss";

const BurgerMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  const dispatch = useDispatch();

  const closeBurger = () => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      dispatch(switchBurgerStatus(false));
    }, 300);
  };

  const changeTheme = () => {
    dispatch(swithTheme(!isLightTheme));
  };

  return (
    <>
      <Spring
        from={{ transform: "translateX(-300px)" }}
        to={{ transform: "translateX(0px)" }}
        reverse={isVisible}
        delay={100}
      >
        {(styles) => (
          <animated.div className="burger" style={styles}>
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
                <ul className={isLightTheme ? "menu light" : "menu"}>
                  <li className="menu__item">
                    <SvgTemplate id="profile" />
                    <span className="menu__link">Profile</span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="like" />
                    <span className="menu__link">Liked Songs</span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="language" />
                    <span className="menu__link">Language</span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="message" />
                    <span className="menu__link">Contact us</span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="faqs" />
                    <span className="menu__link">FAQs</span>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="main-settings" />
                    <span className="menu__link">Settings</span>
                  </li>
                </ul>
              </nav>
            </div>
          </animated.div>
        )}
      </Spring>
    </>
  );
};

export default BurgerMenu;
