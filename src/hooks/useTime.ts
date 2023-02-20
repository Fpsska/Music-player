import { useAppDispatch } from '../app/hooks';

import {
    setCurrentTimeProgress,
    setCurrentLineProgress,
    setDuration,
    setSongDuration
} from '../app/slices/playerSlice';

// /. imports

interface propTypes {
    duration: number;
    currentTime: number;
}

// /. interfaces

export function useTime() {
    const dispatch = useAppDispatch();

    const timeHandler = (props: propTypes) => {
        const { duration, currentTime } = props;

        if (isNaN(duration)) return;

        console.log('duration:', duration, currentTime);

        let currentMinutes = String(Math.floor(currentTime / 60));
        let currentSeconds = String(Math.floor(currentTime % 60));
        let totalMinutes = String(Math.floor(duration / 60));
        let totalSeconds = String(Math.floor(duration % 60));

        if (+currentMinutes < 10) {
            currentMinutes = `0${currentMinutes}`;
        }
        if (+currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (+totalMinutes < 10) {
            totalMinutes = `0${totalMinutes}`;
        }
        if (+totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`;
        }

        dispatch(setDuration(duration));
        dispatch(setSongDuration(`${totalMinutes}:${totalSeconds}`));
        dispatch(setCurrentTimeProgress(`${currentMinutes}:${currentSeconds}`));
        dispatch(setCurrentLineProgress((currentTime / duration) * 100));
    };

    return { timeHandler };
}
