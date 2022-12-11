import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
    setArtistName,
    setTrackPreview,
    setTrackName
} from '../app/slices/playerSlice';

// /. imports

interface propTypes {
    songObj: any;
}

// ./ interfaces

export function useLoadMusic() {
    const { isLoading } = useAppSelector(state => state.mainSlice);

    const dispatch = useAppDispatch();

    const loadMusic = (props: propTypes) => {
        const { songObj } = props;

        if (!isLoading) {
            document
                .querySelector('.player__audio')
                ?.setAttribute('src', songObj.preview); // mp3
            dispatch(setTrackPreview(songObj.artist.picture_medium)); // image
            dispatch(setArtistName(songObj.artist.name)); // artist-name
            dispatch(setTrackName(songObj.title)); // song-name
        }
    };

    return { loadMusic };
}
