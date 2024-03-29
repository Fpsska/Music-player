import React, { useEffect, useState } from 'react';

import { BsHeart } from 'react-icons/bs';
import { BiVolumeLow } from 'react-icons/bi';
import { IoMdRepeat } from 'react-icons/io';
import { FiShuffle } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import {
    switchMutedStatus,
    addToLikedAlbum,
    setCurrentCardID
} from 'app/slices/playerSlice';

import { useMusicController } from 'hooks/useMusicController';

import Slider from 'components/layout/Slider/Slider';

// /. imports

const PlayerPage: React.FC = () => {
    const {
        songDuration,
        currentTimeProgress,
        isAudioMuted,
        currentPlayerData,
        likedData,
        musicIndex,
        currentCardID,
        isSameSong
    } = useAppSelector(state => state.playerSlice);

    const { isLoading } = useAppSelector(state => state.mainSlice);
    const [isAlreadyAdded, setAddedStatus] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const audioEl = document.querySelector(
        '.player__audio'
    ) as HTMLAudioElement;

    const { loadMusic, resetBarState, playMusic } = useMusicController(audioEl);

    // /. hooks

    const muteVolume = (): void => {
        dispatch(switchMutedStatus(!isAudioMuted));
    };

    const addToFavorite = (): void => {
        // dispatch(addToLikedAlbum({ id: currentCardID }));
        // console.log('added');
    };

    // /. functions

    useEffect(() => {
        // autoplay different song
        if (!isSameSong) {
            loadMusic(musicIndex);
            playMusic();
            resetBarState();
        }
    }, [currentPlayerData, musicIndex, isSameSong]);

    useEffect(() => {
        // check equal items in likedData
        likedData.some(item => item.id === currentCardID)
            ? setAddedStatus(true)
            : setAddedStatus(false);
    }, [likedData, currentCardID]);

    // /. effects

    return (
        <section className="player">
            <div className="player__slider">
                <Slider role={'playerlist'} />
            </div>
            <div className="player__section">
                <div className="player__navigation">
                    <button
                        className="player__button player__button--volume volume"
                        type="button"
                        aria-label={
                            isAudioMuted ? 'unmute sound' : 'mute sound'
                        }
                        onClick={muteVolume}
                    >
                        <BiVolumeLow
                            size={20}
                            color={'#8996b8'}
                        />
                        <span
                            className={
                                isAudioMuted
                                    ? 'volume__label muted'
                                    : 'volume__label'
                            }
                        ></span>
                        <span
                            className={
                                isAudioMuted
                                    ? 'volume__label muted'
                                    : 'volume__label'
                            }
                        ></span>
                    </button>
                    <div>
                        {' '}
                        {/* NAME */}
                        <button
                            className="player__button player__button--repeat"
                            type="button"
                            aria-label="repeat track"
                        >
                            <IoMdRepeat
                                size={20}
                                color={'#8996b8'}
                            />
                        </button>
                        <button
                            className="player__button player__button--oder"
                            type="button"
                            aria-label="shuffle track"
                        >
                            <FiShuffle
                                size={19}
                                color={'#8996b8'}
                            />
                        </button>
                        <button
                            className="player__button player__button--like"
                            type="button"
                            aria-label="add to favourite playlist"
                            onClick={() =>
                                !isAlreadyAdded && !isLoading && addToFavorite()
                            }
                        >
                            <BsHeart
                                size={18}
                                color={'#8996b8'}
                            />
                        </button>
                    </div>
                </div>
                <div className="player__time time">
                    <span className="time__current">
                        {currentTimeProgress || '00:00'}
                    </span>
                    <span className="time__length">
                        {songDuration || '00:00'}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default PlayerPage;
