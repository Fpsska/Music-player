import React from "react";
import "./bar.scss";

const Bar = () => {
  return (
    <div className="progress">
      <div className="progress__line">
        <span className="progress__circle"></span>
      </div>
    </div>
  );
};

export default Bar;
