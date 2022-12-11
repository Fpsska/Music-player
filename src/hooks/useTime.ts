import { useAppDispatch } from '../app/hooks';

import {
    setCurrentTimeProgress,
    setCurrentLineProgress,
    setDuration,
    setSongDuration
} from '../app/slices/playerSlice';

// /. imports

interface propTypes {
    duration: any;
    currentTime: any;
}

// /. interfaces

export function useTime() {
    const dispatch = useAppDispatch();

    const timeHandler = (props: propTypes) => {
        const { duration, currentTime } = props;

        let totalSecond = String(Math.floor(duration % 60));
        const totalMinute = String(Math.floor(duration / 60));
        if (+totalSecond < 10) {
            totalSecond = `0${totalSecond}`;
        }
        //
        let currentSecond = String(Math.floor(currentTime % 60));
        const currentMinute = String(Math.floor(currentTime / 60));
        if (+currentSecond < 10) {
            currentSecond = `0${currentSecond}`;
        }

        dispatch(setDuration(duration));
        dispatch(setSongDuration(`${totalMinute}:${totalSecond}`));
        dispatch(setCurrentTimeProgress(`${currentMinute}:${currentSecond}`));
        dispatch(setCurrentLineProgress((currentTime / duration) * 100));
    };

    return { timeHandler };
}
