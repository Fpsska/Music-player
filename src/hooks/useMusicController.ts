import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
    switchPauseStatus,
    setArtistName,
    setTrackPreview,
    setTrackName,
    setCurrentLineProgress,
    setCurrentTimeProgress,
    setOffsetTime
} from '../app/slices/playerSlice';

// /. imports

export function useMusicController() {
    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { albumList } = useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    const loadMusic = (audioEl: HTMLAudioElement, musicIndex: number): void => {
        console.log('load func:', musicIndex);
        if (!isLoading && audioEl) {
            audioEl.setAttribute('src', albumList[musicIndex].preview); // mp3
            audioEl.load(); // reload audio track

            dispatch(
                setTrackPreview(albumList[musicIndex].artist.picture_medium)
            ); // image
            dispatch(setArtistName(albumList[musicIndex].artist.name)); // artist-name
            dispatch(setTrackName(albumList[musicIndex].title)); // song-name
        }
    };

    const playMusic = (audioEl: HTMLAudioElement): void => {
        audioEl &&
            setTimeout(() => {
                // fix Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause() error
                // when song is automaticly switched
                audioEl.play();
                dispatch(switchPauseStatus(false));
            }, 0);
    };

    const pauseMusic = (audioEl: HTMLAudioElement): void => {
        if (audioEl) {
            audioEl.pause();
            dispatch(switchPauseStatus(true));
        }
    };

    const resetBarState = (): void => {
        dispatch(setCurrentLineProgress(0));
        dispatch(setCurrentTimeProgress(0));
        dispatch(setOffsetTime(0));
    };

    // /. functions

    return { loadMusic, playMusic, pauseMusic, resetBarState };
}
