import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import { Spring, animated } from "react-spring";

const Footer = () => {
  const { isBurgerOpen } = useSelector((state) => state.burgerSlice);
  const { isPlayerPage } = useSelector((state) => state.mainSlice);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(!isVisible);
  }, [isBurgerOpen]);

  return (
    <div className={isPlayerPage ? "footer container" : "footer"}>
      <Spring
        from={{ transform: "translateY(200px)" }}
        to={{ transform: "translateY(0px)" }}
        reverse={isVisible}
      >
        {(styles) => (
          <animated.div className="page__navigation" style={styles}>
            <Navigation />
          </animated.div>
        )}
      </Spring>
    </div>
  );
};

export default Footer;
