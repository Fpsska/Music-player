import React, { useRef, useEffect, useCallback } from 'react';

import { IoPlayOutline } from 'react-icons/io5';
import { AiOutlinePause } from 'react-icons/ai';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { useTime } from '../../hooks/useTime';

import {
  switchPauseStatus,
  setTrackPreview,
  setArtistName,
  setTrackName,
  setCurrentLineProgress,
  setCurrentTimeProgress,
  setOffsetTime,
  setCurrentmusicIndex
} from '../../app/slices/playerSlice';

import { RootState } from '../../app/store';

import './buttons.scss';

// /. imports

const Buttons: React.FC = () => {
  const { isPlayerPage, isLoading } = useAppSelector((state: RootState) => state.mainSlice);
  const {
    isPaused,
    albumList,
    duration,
    offsetCurrentTime,
    isAudioMuted,
    musicIndex,
    currentTrack
  } = useAppSelector((state: RootState) => state.playerSlice);
  const dispatch = useAppDispatch();
  //
  const prevBtn = useRef<HTMLButtonElement>(null);
  const pauseBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const trackOrder = useRef<HTMLAudioElement>(null!);
  //

  const loadMusic = (index: number): void => {
    if (!isLoading) {
      trackOrder.current.src = albumList[index - 1].preview;
      dispatch(setTrackPreview(albumList[index - 1].artist.picture_medium));
      dispatch(setArtistName(albumList[index - 1].artist.name));
      dispatch(setTrackName(albumList[index - 1].title));
    }
  };

  useEffect(() => {
    loadMusic(musicIndex);
  }, [isLoading, albumList]);


  const { timeHandler } = useTime();

  const defineTimeCount = useCallback((e: any): void => {
    timeHandler({ duration: e.target.duration, currentTime: e.target.currentTime });
  }, []);

  useEffect(() => {
    trackOrder.current.addEventListener('timeupdate', defineTimeCount);
    return () =>
      trackOrder.current.removeEventListener('timeupdate', defineTimeCount);
  }, [duration, offsetCurrentTime, defineTimeCount]);


  const playMusic = (): void => {
    trackOrder.current.play();
  };
  const pauseMusic = (): void => {
    trackOrder.current.pause();
  };
  const defineButtonEvent = (): void => {
    dispatch(switchPauseStatus(!isPaused));
    !isPaused ? pauseMusic() : playMusic();
  };


  const nextSong = (): void => {
    dispatch(setCurrentmusicIndex(musicIndex + 1));
    musicIndex >= albumList.length
      ? dispatch(setCurrentmusicIndex(1))
      : dispatch(setCurrentmusicIndex(musicIndex + 1));
    // value check
    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
    dispatch(setCurrentLineProgress(0));
    dispatch(setCurrentTimeProgress(0));
    dispatch(setOffsetTime(0));
    console.log(document.querySelector('.swiper-slide'));
  };

  const prevSong = (): void => {
    dispatch(setCurrentmusicIndex(musicIndex - 1));
    musicIndex <= 1
      ? dispatch(setCurrentmusicIndex(albumList.length))
      : dispatch(setCurrentmusicIndex(musicIndex - 1));
    // value check
    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
    dispatch(setCurrentLineProgress(0));
    dispatch(setCurrentTimeProgress(0));
    dispatch(setOffsetTime(0));
    console.log(Array.from(document.querySelectorAll('.swiper-slide')).filter(item => item.classList.contains('swiper-slide-active'))[0].children[0].id);
  };


  useEffect(() => {
    trackOrder.current.currentTime = offsetCurrentTime;
  }, [offsetCurrentTime]);
  //
  return (
    <nav
      className={isPlayerPage ? 'nav nav--player' : 'nav'}
    >
      <button
        ref={prevBtn}
        disabled={isLoading}
        onClick={prevSong}
        className="nav__button prev">
        <MdOutlineSkipPrevious size={32} color={'#eaf0ff'} />
      </button>
      <button
        ref={pauseBtn}
        disabled={isLoading}
        onClick={defineButtonEvent}
        className={`nav__button ${isPaused ? 'pause' : 'play'}`}
      >
        {isPaused
          ? <IoPlayOutline size={isPlayerPage ? 56 : 34} color={'#eaf0ff'} />
          : <AiOutlinePause size={isPlayerPage ? 56 : 34} color={'#eaf0ff'} />}
      </button>
      <button
        ref={nextBtn}
        disabled={isLoading}
        onClick={nextSong}
        className="nav__button next">
        <MdOutlineSkipNext size={32} color={'#eaf0ff'} />
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
