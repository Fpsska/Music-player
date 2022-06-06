import React, { useState, useEffect, useCallback } from 'react';

import { Spring, animated } from 'react-spring';

import { MdOutlineClose } from 'react-icons/md';
import { BsMoon } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  switchBurgerStatus,
  switchInformationStatus
} from '../../app/slices/burgerSlice';

import { RootState } from '../../app/store';

import { useTheme } from '../../hooks/useTheme';

import BurgerNav from './BurgerNav';

import './burger.scss';

// /. imports

const BurgerMenu: React.FC = () => {
  const { isCurtainVisible } = useAppSelector(
    (state: RootState) => state.burgerSlice
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isSwitched, setSwithedStatus] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const dispatch = useAppDispatch();
  //
  const closeBurger = (): void => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      dispatch(switchBurgerStatus(false));
      dispatch(switchInformationStatus(false));
    }, 400);
  };

  const keyHandler = useCallback((e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      closeBurger();
      setTimeout(() => {
        dispatch(switchInformationStatus(false));
      }, 450);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isVisible, keyHandler]);

  const changeTheme = (): void => {
    // setSwithedStatus(!isSwitched);
  };

  useEffect(() => {
    isSwitched ? setTheme('light') : setTheme('dark');
  }, [isSwitched]);
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
                  <MdOutlineClose size={32} color={'#eaf0ff'} />
                </button>
                <button
                  className="burger__button burger__button--theme"
                  type="button"
                  onClick={changeTheme}
                >
                  <BsMoon size={22} color={'#eaf0ff'}/>
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
