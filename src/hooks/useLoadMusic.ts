import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
    setArtistName,
    setTrackPreview,
    setTrackName,
    setCurrentLineProgress,
    setCurrentTimeProgress,
    setOffsetTime
} from '../app/slices/playerSlice';

// /. imports

export function useLoadMusic() {
    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { albumList } = useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    const loadMusic = (musicIndex: number): void => {
        if (!isLoading) {
            document
                .querySelector('.player__audio')
                ?.setAttribute('src', albumList[musicIndex].preview); // mp3

            dispatch(
                setTrackPreview(albumList[musicIndex].artist.picture_medium)
            ); // image
            dispatch(setArtistName(albumList[musicIndex].artist.name)); // artist-name
            dispatch(setTrackName(albumList[musicIndex].title)); // song-name
        }
    };

    const resetBarState = (): void => {
        dispatch(setCurrentLineProgress(0));
        dispatch(setCurrentTimeProgress(0));
        dispatch(setOffsetTime(0));
    };

    // /. functions

    return { loadMusic, resetBarState };
}
