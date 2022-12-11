import React, { useRef, useEffect } from 'react';

import { IoPlayOutline } from 'react-icons/io5';
import { AiOutlinePause } from 'react-icons/ai';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useTime } from '../../hooks/useTime';

import {
    switchPauseStatus,
    setCurrentLineProgress,
    setCurrentTimeProgress,
    setOffsetTime,
    setCurrentmusicIndex
} from '../../app/slices/playerSlice';

import { useLoadMusic } from '../../hooks/useLoadMusic';

import './buttons.scss';

// /. imports

const Buttons: React.FC = () => {
    const { isPlayerPage, isLoading } = useAppSelector(
        state => state.mainSlice
    );
    const {
        isPaused,
        albumList,
        offsetCurrentTime,
        isAudioMuted,
        musicIndex,
        currentTrack
    } = useAppSelector(state => state.playerSlice);
    const dispatch = useAppDispatch();
    //
    const prevBtn = useRef<HTMLButtonElement>(null);
    const pauseBtn = useRef<HTMLButtonElement>(null);
    const nextBtn = useRef<HTMLButtonElement>(null);
    const trackOrder = useRef<HTMLAudioElement>(null!);
    //

    const { loadMusic } = useLoadMusic();
    const { timeHandler } = useTime();

    useEffect(() => {
        !isLoading && loadMusic({ songObj: albumList[0] });
        timeHandler({ currentTime: 0, duration: 0 }); // set initial currentTime, duration
    }, [isLoading]);

    useEffect(() => {
        const defineTimeCount = (e: any): void => {
            // add logic of set time for searchPage items
            !isLoading &&
                setTimeout(() => {
                    timeHandler({
                        duration: e.target.duration,
                        currentTime: e.target.currentTime
                    });
                }, 150);
        };

        trackOrder.current.volume = 0.1; // set initial volume

        trackOrder.current.addEventListener('timeupdate', defineTimeCount);
        return () => {
            trackOrder.current.removeEventListener(
                'timeupdate',
                defineTimeCount
            );
        };
    }, [isLoading]);

    const playMusic = (): void => {
        trackOrder.current.play();
        dispatch(switchPauseStatus(false));
    };

    const pauseMusic = (): void => {
        trackOrder.current.pause();
        dispatch(switchPauseStatus(true));
    };

    const defineButtonEvent = (): void => {
        isPaused ? playMusic() : pauseMusic();
    };

    const nextSong = (): void => {
        dispatch(setCurrentmusicIndex(musicIndex + 1));

        if (musicIndex >= albumList.length - 1) {
            dispatch(setCurrentmusicIndex(0));
        }

        loadMusic({ songObj: albumList[musicIndex] });

        playMusic();

        dispatch(switchPauseStatus(false));

        dispatch(setCurrentLineProgress(0));
        dispatch(setCurrentTimeProgress(0));
        dispatch(setOffsetTime(0));
    };

    const prevSong = (): void => {
        dispatch(setCurrentmusicIndex(musicIndex - 1));

        if (musicIndex <= 0) {
            dispatch(setCurrentmusicIndex(albumList.length - 1));
        }

        loadMusic({ songObj: albumList[musicIndex] });

        playMusic();

        dispatch(switchPauseStatus(false));

        dispatch(setCurrentLineProgress(0));
        dispatch(setCurrentTimeProgress(0));
        dispatch(setOffsetTime(0));
    };

    useEffect(() => {
        trackOrder.current.currentTime = offsetCurrentTime;
    }, [offsetCurrentTime]);
    //
    return (
        <nav className={isPlayerPage ? 'nav nav--player' : 'nav'}>
            <button
                ref={prevBtn}
                disabled={isLoading}
                onClick={prevSong}
                className="nav__button prev"
            >
                <MdOutlineSkipPrevious
                    size={32}
                    color={'#eaf0ff'}
                />
            </button>
            <button
                ref={pauseBtn}
                disabled={isLoading}
                onClick={defineButtonEvent}
                className={`nav__button ${isPaused ? 'pause' : 'play'}`}
            >
                {isPaused ? (
                    <IoPlayOutline
                        size={isPlayerPage ? 56 : 34}
                        color={'#eaf0ff'}
                    />
                ) : (
                    <AiOutlinePause
                        size={isPlayerPage ? 56 : 34}
                        color={'#eaf0ff'}
                    />
                )}
            </button>
            <button
                ref={nextBtn}
                disabled={isLoading}
                onClick={nextSong}
                className="nav__button next"
            >
                <MdOutlineSkipNext
                    size={32}
                    color={'#eaf0ff'}
                />
            </button>
            <audio
                className="player__audio"
                muted={isAudioMuted}
                ref={trackOrder}
                src={currentTrack}
            ></audio>
        </nav>
    );
};

export default Buttons;
