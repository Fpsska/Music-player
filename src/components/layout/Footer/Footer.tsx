import React, { useEffect, useState } from 'react';

import { Spring, animated } from 'react-spring';

import Navigation from 'components/ui/Navigation/Navigation';

import { useAppSelector } from 'app/hooks';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    const { isBurgerOpen } = useAppSelector(state => state.burgerSlice);
    const { pagesStatuses } = useAppSelector(state => state.mainSlice);

    const [isVisible, setIsVisible] = useState(true);

    // /. hooks

    useEffect(() => {
        setIsVisible(!isVisible);
    }, [isBurgerOpen]);

    // /. effects

    return (
        //
        <footer
            className={
                pagesStatuses.isPlayerPage ? 'footer footer--player' : 'footer'
            }
        >
            <Spring
                from={{ transform: 'translateY(200px)' }}
                to={{ transform: 'translateY(0px)' }}
                reverse={isVisible}
            >
                {(styles: any) => (
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
