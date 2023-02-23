import React, { useRef, useEffect, useCallback } from 'react';

import { IoPlayOutline } from 'react-icons/io5';
import { AiOutlinePause } from 'react-icons/ai';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useMusicController } from '../../hooks/useMusicController';
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
    const prevBtnRef = useRef<HTMLButtonElement>(null!);
    const pauseBtnRef = useRef<HTMLButtonElement>(null!);
    const nextBtnRef = useRef<HTMLButtonElement>(null!);

    const { loadMusic, playMusic, pauseMusic, resetBarState } =
        useMusicController();
    const { timeHandler } = useTime();

    // /. hooks

    const determineButtonEvent = (): void => {
        isPaused
            ? playMusic(audioElRef.current)
            : pauseMusic(audioElRef.current);
    };

    const playNextSong = (): void => {
        if (musicIndex >= albumList.length - 1) {
            nextBtnRef.current.setAttribute('disabled', '');
        } else {
            dispatch(setCurrentmusicIndex(musicIndex + 1));
            prevBtnRef.current.removeAttribute('disabled');

            playMusic(audioElRef.current);
            resetBarState();
        }
    };

    const playPrevSong = (): void => {
        if (musicIndex <= 0) {
            prevBtnRef.current.setAttribute('disabled', '');
        } else {
            dispatch(setCurrentmusicIndex(musicIndex - 1));
            nextBtnRef.current.removeAttribute('disabled');

            playMusic(audioElRef.current);
            resetBarState();
        }
    };

    // /. functions

    useEffect(() => {
        // load current song info from albumList[] by musicIndex
        loadMusic(audioElRef.current, musicIndex);
    }, [musicIndex]);

    useEffect(() => {
        if (!isLoading) {
            // set initial currentTime, duration, musicIndex
            loadMusic(audioElRef.current, musicIndex);
            timeHandler({ currentTime: 0, duration: 0 });
        }
        if (audioElRef) audioElRef.current.volume = 0.1; // set initial volume value
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
        // determine next song after last song of albumList[] is finished playing
        const eventAfterSongEnded = (): void => {
            console.log('ended EVENT');
            if (musicIndex < albumList.length - 1 && musicIndex !== 0) {
                setTimeout(() => {
                    playNextSong();
                }, 1000);
            } else {
                // switch to 1st song when current song is last in []
                dispatch(setCurrentmusicIndex(0));
                resetBarState();
            }
        };

        audioElRef.current.addEventListener('ended', eventAfterSongEnded);
        return () => {
            audioElRef.current.removeEventListener(
                'ended',
                () => eventAfterSongEnded
            );
        };
    }, [musicIndex, albumList]);

    useEffect(() => {
        // controle duration-bar value by click
        audioElRef.current.currentTime = offsetCurrentTime;
    }, [offsetCurrentTime]);

    // /. effects

    return (
        <nav className={pagesStatuses.isPlayerPage ? 'nav nav--player' : 'nav'}>
            <button
                className="nav__button prev"
                ref={prevBtnRef}
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
                ref={pauseBtnRef}
                type="button"
                aria-label={isPaused ? 'play track' : 'pause track'}
                disabled={isLoading}
                onClick={determineButtonEvent}
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
                ref={nextBtnRef}
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
