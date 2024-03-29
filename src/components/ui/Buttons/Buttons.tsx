import React, { useRef, useEffect, useCallback } from 'react';

import { IoPlayOutline } from 'react-icons/io5';
import { AiOutlinePause } from 'react-icons/ai';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { useMusicController } from 'hooks/useMusicController';
import { useTime } from 'hooks/useTime';

import {
    switchPauseStatus,
    setCurrentmusicIndex
} from 'app/slices/playerSlice';

import './buttons.scss';

// /. imports

const Buttons: React.FC = () => {
    const { pagesStatuses, isLoading } = useAppSelector(
        state => state.mainSlice
    );
    const {
        isPaused,
        currentPlayerData,
        offsetCurrentTime,
        isAudioMuted,
        musicIndex,
        musicCategory
    } = useAppSelector(state => state.playerSlice);

    const dispatch = useAppDispatch();

    const audioElRef = useRef<HTMLAudioElement>(null!);
    const prevBtnRef = useRef<HTMLButtonElement>(null!);
    const pauseBtnRef = useRef<HTMLButtonElement>(null!);
    const nextBtnRef = useRef<HTMLButtonElement>(null!);

    const { loadMusic, playMusic, pauseMusic, resetBarState } =
        useMusicController(audioElRef.current);
    const { timeHandler } = useTime();

    // /. hooks

    const isNavDisabled =
        isLoading || currentPlayerData.length === 0 || !audioElRef.current.src;

    const determineButtonEvent = useCallback((): void => {
        isPaused ? playMusic() : pauseMusic();
    }, [isPaused, playMusic, pauseMusic]);

    const playNextSong = useCallback((): void => {
        if (musicIndex >= currentPlayerData.length - 1) {
            // nextBtnRef.current.setAttribute('disabled', '');
        } else {
            dispatch(setCurrentmusicIndex(musicIndex + 1));
            playMusic();
            resetBarState();
        }
    }, [musicIndex, currentPlayerData]);

    const playPrevSong = useCallback((): void => {
        if (musicIndex <= 0) {
            // prevBtnRef.current.setAttribute('disabled', '');
        } else {
            dispatch(setCurrentmusicIndex(musicIndex - 1));
            playMusic();
            resetBarState();
        }
    }, [musicIndex]);

    // /. functions

    useEffect(() => {
        // load current song info from albumList[] by musicIndex
        loadMusic(musicIndex);
    }, [musicIndex]);

    useEffect(() => {
        // determine status of disabled attr for nav__button elmts
        if (!isLoading) {
            if (musicIndex >= currentPlayerData.length - 1) {
                nextBtnRef.current.setAttribute('disabled', '');
            }
            if (musicIndex < currentPlayerData.length - 1) {
                nextBtnRef.current.removeAttribute('disabled');
            }
            if (musicIndex <= 0) {
                prevBtnRef.current.setAttribute('disabled', '');
            }
            if (musicIndex > 0) {
                prevBtnRef.current.removeAttribute('disabled');
            }
        }
    }, [musicIndex, currentPlayerData, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            // set initial currentTime, duration, musicIndex
            loadMusic(musicIndex);
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
            // console.log('ended EVENT');
            if (musicIndex < currentPlayerData.length - 1 && musicIndex !== 0) {
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
    }, [musicIndex, currentPlayerData]);

    useEffect(() => {
        // controle duration-bar value by click
        audioElRef.current.currentTime = offsetCurrentTime;
    }, [offsetCurrentTime]);

    useEffect(() => {
        // play/pause music by keyboard event
        if (isLoading) return;

        const onDocumentKeyPress = (e: KeyboardEvent): void => {
            switch (e.code) {
                case 'Space':
                    determineButtonEvent();
                    break;
                case 'ArrowLeft':
                    playPrevSong();
                    break;
                case 'ArrowRight':
                    playNextSong();
                    break;
                default:
                    return;
            }
        };

        document.addEventListener('keydown', onDocumentKeyPress);
        return () => {
            document.removeEventListener('keydown', onDocumentKeyPress);
        };
    }, [isLoading, determineButtonEvent, playPrevSong, playNextSong]);

    // /. effects

    return (
        <nav className={pagesStatuses.isPlayerPage ? 'nav nav--player' : 'nav'}>
            <button
                className="nav__button prev"
                ref={prevBtnRef}
                type="button"
                aria-label="switch to previous track"
                disabled={isNavDisabled}
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
                disabled={isNavDisabled}
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
                disabled={isNavDisabled}
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
