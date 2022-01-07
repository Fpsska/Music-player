import React from "react";
import SvgTemplate from "../SvgTemplate";
import "./burger.scss";

const BurgerMenu = () => {
  return (
    <div className="burger">
      <div className="burger__wrapper">
        <div className="burger__navigation">
          <button className="burger__button" type="button">
            <SvgTemplate id="close" />
          </button>
          <button className="burger__button" type="button">
            <SvgTemplate id="theme" />
          </button>
        </div>
        <nav className="burger__menu">
          <ul className="menu">
            <li className="menu__item">
              <SvgTemplate id="profile" />
              <a className="menu__link" href="">
                Profile
              </a>
            </li>
            <li className="menu__item">
              <SvgTemplate id="like" />
              <a className="menu__link" href="">
                Liked Songs
              </a>
            </li>
            <li className="menu__item">
              <SvgTemplate id="language" />
              <a className="menu__link" href="">
                Language
              </a>
            </li>
            <li className="menu__item">
              <SvgTemplate id="message" />
              <a className="menu__link" href="">
                Contact us
              </a>
            </li>
            <li className="menu__item">
              <SvgTemplate id="faqs" />
              <a className="menu__link" href="">
                FAQs
              </a>
            </li>
            <li className="menu__item">
              <SvgTemplate id="main-settings" />
              <a className="menu__link" href="">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
