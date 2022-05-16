import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setOffsetTime } from '../../app/slices/mainSlice';
import './bar.scss';
import { RootState } from '../../app/store';

// /. imports

const Bar: React.FC = () => {
  const { isLightTheme } = useSelector((state: RootState) => state.burgerSlice);
  const { currentLineProgress, duration, isPaused, isLoading } = useSelector(
    (state: RootState) => state.mainSlice
  );
  const progressArea = useRef<HTMLDivElement>(null!);
  const progressLine = useRef<HTMLDivElement>(null!);
  const dispatch = useDispatch();

  const setNewCurrentTime = useCallback(
    (event): void => {
      if (!isPaused && !isLoading) {
        const width = progressArea.current.clientWidth;
        const offset = event.offsetX;
        const newCurrentTime = (offset / width) * duration;
        dispatch(setOffsetTime(newCurrentTime));
      }
    },
    [duration]
  );

  useEffect(() => {
    progressArea.current.addEventListener('click', setNewCurrentTime);
    return () => {
      progressArea.current.removeEventListener('click', setNewCurrentTime);
    };
  }, [duration]);

  useEffect(() => {
    if (!isPaused && !isLoading) {
      setTimeout(() => {
        progressLine.current.classList.add('active');
      }, 500);
    } else {
      progressLine.current.classList.remove('active');
    }
  }, [isPaused, isLoading]);
  // 
  return (
    <div
      ref={progressArea}
      className={isLightTheme ? 'progress light' : 'progress'}
    >
      <div
        ref={progressLine}
        className="progress__line"
        style={{ width: `${currentLineProgress}%` }}
      ></div>
    </div>
  );
};

export default Bar;
