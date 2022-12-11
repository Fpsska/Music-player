import React, { useRef, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setOffsetTime } from '../../app/slices/playerSlice';

import './bar.scss';

// /. imports

const Bar: React.FC = () => {
    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { currentLineProgress, duration, isPaused } = useAppSelector(
        state => state.playerSlice
    );

    const progressArea = useRef<HTMLDivElement>(null!);
    const progressLine = useRef<HTMLDivElement>(null!);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const setNewCurrentTime = (event: any): void => {
            // handle progress bar line
            if (!isLoading) {
                const width = progressArea.current.clientWidth;
                const offset = event.offsetX;
                const newCurrentTime = (offset / width) * duration;
                dispatch(setOffsetTime(newCurrentTime));
            }
        };

        progressArea.current.addEventListener('click', setNewCurrentTime);
        return () => {
            progressArea.current.removeEventListener(
                'click',
                setNewCurrentTime
            );
        };
    }, [isLoading, duration]);

    useEffect(() => {
        if (!isPaused && !isLoading) {
            progressLine.current.classList.add('active');
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
