import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
    setArtistName,
    setTrackPreview,
    setTrackName,
    setCurrentSlideID
} from '../app/slices/playerSlice';

// /. imports

interface propTypes {
    index: number,
}

// ./ interfaces

export function useLoadMusic() {

    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { albumList } = useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();

    const loadMusic = (props: propTypes) => {

        const { index } = props;

        if (!isLoading) {
            document.querySelector('.player__audio')?.setAttribute('src', albumList[index - 1].preview);
            dispatch(setTrackPreview(albumList[index - 1].artist.picture_medium));
            dispatch(setArtistName(albumList[index - 1].artist.name));
            dispatch(setTrackName(albumList[index - 1].title));

            dispatch(setCurrentSlideID(albumList[index - 1].id));
        }
    };

    return { loadMusic };

}; 