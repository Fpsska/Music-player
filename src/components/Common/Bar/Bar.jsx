import React from "react";
import { useSelector } from "react-redux";
import "./bar.scss";

const Bar = () => {
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  return (
    <div className={isLightTheme ? "progress light" : "progress"}>
      <div className="progress__line">
        <span className="progress__circle"></span>
      </div>
    </div>
  );
};

export default Bar;
