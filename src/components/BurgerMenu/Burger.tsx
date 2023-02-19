import React, { useState, useEffect, useRef } from 'react';

import { Spring, animated } from 'react-spring';

import { MdOutlineClose } from 'react-icons/md';
import { BsMoon } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
    switchBurgerStatus,
    switchInformationStatus
} from '../../app/slices/burgerSlice';

import { useTheme } from '../../hooks/useTheme';

import BurgerNav from './BurgerNav';

import './burger.scss';

// /. imports

const BurgerMenu: React.FC = () => {
    const { isCurtainVisible } = useAppSelector(state => state.burgerSlice);
    const [isVisible, setIsVisible] = useState(false);
    const [isSwitched, setSwithedStatus] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();

    const dispatch = useAppDispatch();
    const burgerRef = useRef<HTMLDivElement>(null!);

    // /. hooks

    const closeBurger = (): void => {
        setIsVisible(!isVisible);
        setTimeout(() => {
            dispatch(switchBurgerStatus(false));
            dispatch(switchInformationStatus(false));
        }, 400);
    };

    const changeTheme = (): void => {
        // setSwithedStatus(!isSwitched);
    };

    // /. functions

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent): void => {
            if (e.code === 'Escape') {
                closeBurger();
                setTimeout(() => {
                    dispatch(switchInformationStatus(false));
                }, 450);
            }
        };

        const areaHandler = (e: any): void => {
            const validArea =
                e.target === 'burger__wrapper' ||
                burgerRef.current.contains(e.target);
            const validElements =
                e.target.className === 'burger__button burger__button--close';
            if (!validArea && !validElements) {
                closeBurger();
            }
        };

        document.addEventListener('keydown', keyHandler);
        document.addEventListener('click', areaHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler);
            document.removeEventListener('click', areaHandler);
        };
    }, [isVisible]);

    useEffect(() => {
        isSwitched ? setTheme('light') : setTheme('dark');
    }, [isSwitched]);

    // /. effects

    return (
        <Spring
            from={{ transform: 'translateX(-300px)' }}
            to={{ transform: 'translateX(0px)' }}
            config={{ duration: 360 }}
            reverse={isVisible}
            delay={100}
        >
            {(styles: any) => (
                <animated.div
                    className="burger"
                    style={styles}
                >
                    <>
                        {isCurtainVisible && (
                            <animated.div
                                className="burger__background"
                                style={styles}
                            ></animated.div>
                        )}
                    </>
                    <div
                        ref={burgerRef}
                        className="burger__wrapper"
                    >
                        <div className="burger__navigation">
                            <button
                                className="burger__button burger__button--close"
                                type="button"
                                aria-label="close burger menu"
                                onClick={closeBurger}
                            >
                                <MdOutlineClose
                                    size={32}
                                    color={'#eaf0ff'}
                                />
                            </button>
                            <button
                                className="burger__button burger__button--theme"
                                type="button"
                                aria-label="switch application theme"
                                onClick={changeTheme}
                            >
                                <BsMoon
                                    size={22}
                                    color={'#eaf0ff'}
                                />
                            </button>
                        </div>
                        <BurgerNav />
                    </div>
                </animated.div>
            )}
        </Spring>
    );
};

export default BurgerMenu;
