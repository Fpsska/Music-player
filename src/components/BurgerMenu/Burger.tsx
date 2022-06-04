import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Spring, animated } from 'react-spring';

import {
  switchBurgerStatus,
  switchInformationStatus
} from '../../app/slices/burgerSlice';
import SvgTemplate from '../Common/SvgTemplate';

import { RootState } from '../../app/store';

import { useTheme } from '../../hooks/useTheme';

import BurgerNav from './BurgerNav';

import './burger.scss';

// /. imports

const BurgerMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isCurtainVisible } = useSelector(
    (state: RootState) => state.burgerSlice
  );
  const dispatch = useDispatch();

  const { theme, setTheme } = useTheme();
  //
  const closeBurger = (): void => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      dispatch(switchBurgerStatus(false));
      dispatch(switchInformationStatus(false));
    }, 400);
  };

  const keyHandler = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      closeBurger();
      setTimeout(() => {
        dispatch(switchInformationStatus(false));
      }, 450);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [isVisible]);

  const changeTheme = (): void => {
  };
  //
  return (
    <>
      <Spring
        from={{ transform: 'translateX(-300px)' }}
        to={{ transform: 'translateX(0px)' }}
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
              className="burger__wrapper"
            >
              <div
                className="burger__navigation"
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
              <BurgerNav />
            </div>
          </animated.div>
        )}
      </Spring>
    </>
  );
};

export default BurgerMenu;
