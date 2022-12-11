import React, { useEffect, useState } from 'react';

import { Spring, animated } from 'react-spring';

import { useAppSelector } from '../../app/hooks';

import Navigation from '../Navigation/Navigation';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    const { isBurgerOpen } = useAppSelector(state => state.burgerSlice);
    const { isPlayerPage } = useAppSelector(state => state.mainSlice);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(!isVisible);
    }, [isBurgerOpen]);

    return (
        //
        <footer className={isPlayerPage ? 'footer footer--player' : 'footer'}>
            <Spring
                from={{ transform: 'translateY(200px)' }}
                to={{ transform: 'translateY(0px)' }}
                reverse={isVisible}
            >
                {styles => (
                    <animated.div
                        className="footer__navigation"
                        style={styles}
                    >
                        <Navigation />
                    </animated.div>
                )}
            </Spring>
        </footer>
    );
};

export default Footer;
