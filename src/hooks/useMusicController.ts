import { useState, useEffect } from 'react';

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

export function useMusicController(audioEl: HTMLAudioElement) {
    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { currentPlayerData } = useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    const isFuncsAvailable =
        !isLoading && audioEl && currentPlayerData.length !== 0;

    const loadMusic = (musicIndex: number): void => {
        if (isFuncsAvailable) {
            console.log('load');
            audioEl.setAttribute('src', currentPlayerData[musicIndex].preview); // mp3
            audioEl.load(); // reload audio track
            dispatch(
                setTrackPreview(
                    currentPlayerData[musicIndex].artist.picture_medium
                )
            ); // image
            dispatch(setArtistName(currentPlayerData[musicIndex].artist.name)); // artist-name
            dispatch(setTrackName(currentPlayerData[musicIndex].title)); // song-name
        }
        return;
    };

    const playMusic = (): void => {
        if (isFuncsAvailable && audioEl.src) {
            setTimeout(() => {
                // fix Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause() error
                // when song is automaticly switched
                audioEl.play();
                dispatch(switchPauseStatus(false));
            }, 0);
        }
        return;
    };

    const pauseMusic = (): void => {
        if (isFuncsAvailable && audioEl.src) {
            console.log('paused');
            audioEl.pause();
            dispatch(switchPauseStatus(true));
        }
        return;
    };

    const resetBarState = (): void => {
        dispatch(setCurrentLineProgress(0));
        dispatch(setCurrentTimeProgress(0));
        dispatch(setOffsetTime(0));
    };

    // /. functions

    return { loadMusic, playMusic, pauseMusic, resetBarState };
}
