import React from 'react';

import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setCurrentPlayerData, setCurrentCardID } from 'app/slices/playerSlice';

import { determineCurrentPlayerData } from 'utils/helpers/determineCurrentPlayerData';
import { generateClassNames } from 'utils/helpers/generateClassNames';

import { IalbumList } from 'types/mainSliceTypes';

import placeholderIMG from 'assets/images/image-error.png';

// /. imports

interface CardPropTypes {
    id: number;
    image: string;
    artist: string;
    track: string;
    isFavourite: boolean;
    role?: string;
    data?: IalbumList[];
}

// /. interfaces

const CardTemplate: React.FC<CardPropTypes> = (props: CardPropTypes) => {
    const { id, image, artist, track, isFavourite, role, data } = props;

    const { pagesStatuses } = useAppSelector(state => state.mainSlice);

    const {
        currentTrackPreview,
        currentArtistName,
        currentTrackName,
        albumList
    } = useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const isRelocateFuncAvaliable = !pagesStatuses.isPlayerPage;

    const cardClassNames: string[] = [
        pagesStatuses.isPlaylistPage ? 'card--playlist' : '',
        pagesStatuses.isPlayerPage ? 'card--player' : '',
        isFavourite ? 'favourite' : ''
    ];
    const cardImageClassNames: string[] = [
        pagesStatuses.isPlaylistPage ? 'card__image--playlist' : '',
        pagesStatuses.isPlayerPage ? 'card__image--player' : ''
    ];

    const actionFromPlaylist = (): void => {
        console.log('actionFromPlaylist');
        data && dispatch(setCurrentPlayerData({ data, id }));
    };

    const actionFromSlider = (): void => {
        console.log('actionFromSlider');
        role &&
            dispatch(
                setCurrentPlayerData({
                    data: determineCurrentPlayerData(albumList, role),
                    id
                })
            );
    };

    const goPlayerPage = (): void => {
        navigate('/Music-player/player');
        dispatch(setCurrentCardID({ id }));
        if (pagesStatuses.isHomePage) {
            actionFromSlider();
        }
        if (pagesStatuses.isPlaylistPage) {
            actionFromPlaylist();
        }
    };

    // /. functions

    return (
        <div
            id={String(id)}
            className={`card ${generateClassNames(...cardClassNames)}`}
        >
            <img
                className={`card__image ${generateClassNames(
                    ...cardImageClassNames
                )}`}
                src={pagesStatuses.isPlayerPage ? currentTrackPreview : image}
                alt="albom-preview"
                onClick={() => isRelocateFuncAvaliable && goPlayerPage()}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholderIMG;
                }}
            />
            <h2
                className={
                    pagesStatuses.isPlayerPage
                        ? 'card__title card__title--player slide'
                        : 'card__title title'
                }
                title={currentTrackName}
            >
                {pagesStatuses.isPlayerPage ? currentTrackName : track}
            </h2>
            <span
                className={
                    pagesStatuses.isPlayerPage
                        ? 'card__subtitle card__subtitle--player subtitle'
                        : 'card__subtitle subtitle'
                }
            >
                {pagesStatuses.isPlayerPage ? currentArtistName : artist}
            </span>
            <br />
            <span style={{ color: '#fff' }}>{id}</span>
        </div>
    );
};

export default CardTemplate;
