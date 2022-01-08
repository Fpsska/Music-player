import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { switchBurgerStatus } from "../../../app/burgerSlice";
import { Spring, animated } from "react-spring";
import SvgTemplate from "../SvgTemplate";
import "./burger.scss";

const BurgerMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const closeBurger = () => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      dispatch(switchBurgerStatus(false));
    }, 300);
  };

  return (
    <>
      <Spring
        from={{ transform: "translateX(-300px)" }}
        to={{ transform: "translateX(0px)" }}
        reverse={isVisible}
        reset={true}
        delay={100}
      >
        {(styles) => (
          <animated.div className="burger" style={styles}>
            <div className="burger__wrapper">
              <div className="burger__navigation">
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
                >
                  <SvgTemplate id="theme" />
                </button>
              </div>
              <nav className="burger__menu">
                <ul className="menu">
                  <li className="menu__item">
                    <SvgTemplate id="profile" />
                    <a className="menu__link" href="#">
                      Profile
                    </a>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="like" />
                    <a className="menu__link" href="#">
                      Liked Songs
                    </a>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="language" />
                    <a className="menu__link" href="#">
                      Language
                    </a>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="message" />
                    <a className="menu__link" href="#">
                      Contact us
                    </a>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="faqs" />
                    <a className="menu__link" href="#">
                      FAQs
                    </a>
                  </li>
                  <li className="menu__item">
                    <SvgTemplate id="main-settings" />
                    <a className="menu__link" href="#">
                      Settings
                    </a>
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
