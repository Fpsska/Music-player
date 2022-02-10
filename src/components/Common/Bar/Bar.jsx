import React from "react";
import { useSelector } from "react-redux";
import "./bar.scss";

const Bar = () => {
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  const { currentLineProgress } = useSelector((state) => state.mainSlice);
  //
  return (
    <div className={isLightTheme ? "progress light" : "progress"}>
      <div
        className="progress__line"
        style={{ width: currentLineProgress + "%" }}
      ></div>
    </div>
  );
};

export default Bar;
