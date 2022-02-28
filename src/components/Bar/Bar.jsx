import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOffsetTime } from "../../app/mainSlice";
import "./bar.scss";

const Bar = () => {
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  const { currentLineProgress, duration, isPaused } = useSelector(
    (state) => state.mainSlice
  );
  const progressArea = useRef();
  const dispatch = useDispatch();

  const setNewCurrentTime = useCallback(
    (event) => {
      if (isPaused === false) {
        const width = progressArea.current.clientWidth;
        const offset = event.offsetX;
        const newCurrentTime = (offset / width) * duration;
        dispatch(setOffsetTime(newCurrentTime));
      }
    },
    [duration]
  );

  useEffect(() => {
    progressArea.current.addEventListener("click", setNewCurrentTime);
    return () => {
      progressArea.current.removeEventListener("click", setNewCurrentTime);
    };
  }, [duration]);
  //
  return (
    <div
      ref={progressArea}
      className={isLightTheme ? "progress light" : "progress"}
    >
      <div
        className="progress__line"
        style={{ width: `${currentLineProgress}%` }}
      ></div>
    </div>
  );
};

export default Bar;
