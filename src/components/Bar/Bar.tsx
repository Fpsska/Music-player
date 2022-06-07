import React, { useRef, useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setOffsetTime } from '../../app/slices/playerSlice';

import { RootState } from '../../app/store';

import './bar.scss';

// /. imports

const Bar: React.FC = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.mainSlice);
  const {
    currentLineProgress,
    duration,
    isPaused
  } = useAppSelector(
    (state: RootState) => state.playerSlice
  );

  const progressArea = useRef<HTMLDivElement>(null!);
  const progressLine = useRef<HTMLDivElement>(null!);
  const dispatch = useAppDispatch();

  const setNewCurrentTime = useCallback(   // handle progress bar line 
    (event): void => {
      if (!isLoading) {
        const width = progressArea.current.clientWidth;
        const offset = event.offsetX;
        const newCurrentTime = (offset / width) * duration;
        dispatch(setOffsetTime(newCurrentTime));
      }
    },
    [isLoading, duration]
  );

  useEffect(() => {
    progressArea.current.addEventListener('click', setNewCurrentTime);
    return () => {
      progressArea.current.removeEventListener('click', setNewCurrentTime);
    };
  }, [setNewCurrentTime]); 

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
      className="progress"
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
