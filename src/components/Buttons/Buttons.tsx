import React, { useRef, useEffect } from 'react';

import { IoPlayOutline } from 'react-icons/io5';
import { AiOutlinePause } from 'react-icons/ai';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useLoadMusic } from '../../hooks/useLoadMusic';
import { useTime } from '../../hooks/useTime';

import {
    switchPauseStatus,
    setCurrentmusicIndex
} from '../../app/slices/playerSlice';

import './buttons.scss';

// /. imports

const Buttons: React.FC = () => {
    const { pagesStatuses, isLoading } = useAppSelector(
        state => state.mainSlice
    );
    const { isPaused, albumList, offsetCurrentTime, isAudioMuted, musicIndex } =
        useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();

    const audioElRef = useRef<HTMLAudioElement>(null!);
    const prevBtn = useRef<HTMLButtonElement>(null!);
    const pauseBtn = useRef<HTMLButtonElement>(null!);
    const nextBtn = useRef<HTMLButtonElement>(null!);

    const { loadMusic, resetBarState } = useLoadMusic();
    const { timeHandler } = useTime();

    // /. hooks

    const playMusic = (): void => {
        audioElRef.current.play();
        dispatch(switchPauseStatus(false));
    };

    const pauseMusic = (): void => {
        audioElRef.current.pause();
        dispatch(switchPauseStatus(true));
    };

    const defineButtonEvent = (): void => {
        isPaused ? playMusic() : pauseMusic();
    };

    const playNextSong = (): void => {
        dispatch(setCurrentmusicIndex(musicIndex + 1));

        if (musicIndex >= albumList.length - 1) {
            dispatch(setCurrentmusicIndex(0));
        }

        loadMusic(musicIndex);
        playMusic();

        dispatch(switchPauseStatus(false));
        resetBarState();
    };

    const playPrevSong = (): void => {
        dispatch(setCurrentmusicIndex(musicIndex - 1));

        if (musicIndex <= 0) {
            dispatch(setCurrentmusicIndex(albumList.length - 1));
        }

        loadMusic(musicIndex);
        playMusic();

        dispatch(switchPauseStatus(false));
        resetBarState();
    };

    // /. functions

    useEffect(() => {
        !isLoading && loadMusic(musicIndex);
        timeHandler({ currentTime: 0, duration: 0 }); // set initial currentTime, duration
        audioElRef.current.volume = 0.1; // set initial volume value
    }, [isLoading]);

    useEffect(() => {
        // update duration, songDuration
        const defineTimeCount = (e: any): void => {
            if (isLoading || !audioElRef) return;

            timeHandler({
                duration: e.target.duration,
                currentTime: e.target.currentTime
            });
        };

        audioElRef.current.addEventListener('timeupdate', defineTimeCount);
        return () => {
            audioElRef.current.removeEventListener(
                'timeupdate',
                defineTimeCount
            );
        };
    }, [isLoading]);

    useEffect(() => {
        // controle duration-bar value by click
        audioElRef.current.currentTime = offsetCurrentTime;
    }, [offsetCurrentTime]);

    // /. effects

    return (
        <nav className={pagesStatuses.isPlayerPage ? 'nav nav--player' : 'nav'}>
            <button
                className="nav__button prev"
                ref={prevBtn}
                type="button"
                aria-label="switch to previous track"
                disabled={isLoading}
                onClick={playPrevSong}
            >
                <MdOutlineSkipPrevious
                    size={32}
                    color={'#eaf0ff'}
                />
            </button>
            <button
                className={`nav__button ${isPaused ? 'pause' : 'play'}`}
                ref={pauseBtn}
                type="button"
                aria-label={isPaused ? 'play track' : 'pause track'}
                disabled={isLoading}
                onClick={defineButtonEvent}
            >
                {isPaused ? (
                    <IoPlayOutline
                        size={pagesStatuses.isPlayerPage ? 56 : 34}
                        color={'#eaf0ff'}
                    />
                ) : (
                    <AiOutlinePause
                        size={pagesStatuses.isPlayerPage ? 56 : 34}
                        color={'#eaf0ff'}
                    />
                )}
            </button>
            <button
                className="nav__button next"
                ref={nextBtn}
                type="button"
                aria-label="switch to next track"
                disabled={isLoading}
                onClick={playNextSong}
            >
                <MdOutlineSkipNext
                    size={32}
                    color={'#eaf0ff'}
                />
            </button>
            <audio
                className="player__audio"
                ref={audioElRef}
                muted={isAudioMuted}
            ></audio>
        </nav>
    );
};

export default Buttons;
