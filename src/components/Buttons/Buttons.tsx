import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SvgTemplate from "../Common/SvgTemplate";
import {
  switchPauseStatus,
  setTrackPreview,
  setArtistName,
  setTrackName,
  setCurrentLineProgress,
  setCurrentTimeProgress,
  setSongDuration,
  setDuration,
  setOffsetTime,
} from "../../app/mainSlice";
import "./buttons.scss";
import { RootState } from "../../app/store";

const Buttons: React.FC = () => {
  const {
    isPlayerPage,
    isPaused,
    isLoading,
    albumList,
    duration,
    offsetCurrentTime,
    isAudioMuted,
  } = useSelector((state: RootState) => state.mainSlice);
  const { isLightTheme } = useSelector((state: RootState) => state.burgerSlice);
  const dispatch = useDispatch();
  //
  const prevBtn = useRef<HTMLButtonElement>(null);
  const pauseBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const trackOrder = useRef<HTMLAudioElement>(null!);
  const [musicIndex, setMusicIndex] = useState(1);
  //

  const loadMusic = (index: number): void => {
    if (!isLoading) {
      trackOrder.current.src = albumList[index - 1].preview;
      dispatch(setTrackPreview(albumList[index - 1].artist.picture_medium));
      dispatch(setArtistName(albumList[index - 1].artist.name));
      dispatch(setTrackName(albumList[index - 1].title));
    }
  };

  const defineTimeCount = (e: any): void => {
    const { duration, currentTime } = e.target;
    dispatch(setDuration(duration));
    //
    let totalSecond = String(Math.floor(duration % 60));
    let totalMinute = String(Math.floor(duration / 60));
    if (+totalSecond < 10) {
      totalSecond = `0${totalSecond}`;
    }
    //
    let currentSecond = String(Math.floor(currentTime % 60));
    let currentMinute = String(Math.floor(currentTime / 60));
    if (+currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    dispatch(setCurrentTimeProgress(`${currentMinute}:${currentSecond}`));
    dispatch(setSongDuration(`${totalMinute}:${totalSecond}`));
    dispatch(setCurrentLineProgress((currentTime / duration) * 100));
  };

  useEffect(() => {
    trackOrder.current.addEventListener("timeupdate", defineTimeCount);
    return () =>
      trackOrder.current.removeEventListener("timeupdate", defineTimeCount);
  }, [duration, offsetCurrentTime]);

  const playMusic = (): void => {
    trackOrder.current.play();
  };

  const pauseMusic = (): void => {
    trackOrder.current.pause();
  };

  const nextSong = (): void => {
    setMusicIndex(musicIndex + 1);
    musicIndex >= albumList.length
      ? setMusicIndex(1)
      : setMusicIndex(musicIndex + 1);

    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
    dispatch(setCurrentLineProgress(0));
    dispatch(setCurrentTimeProgress(0));
    dispatch(setOffsetTime(0));
  };

  const prevSong = (): void => {
    setMusicIndex(musicIndex - 1);
    musicIndex <= 1
      ? setMusicIndex(albumList.length)
      : setMusicIndex(musicIndex - 1);

    loadMusic(musicIndex);
    playMusic();
    dispatch(switchPauseStatus(false));
    dispatch(setCurrentLineProgress(0));
    dispatch(setCurrentTimeProgress(0));
    dispatch(setOffsetTime(0));
  };

  const defineButtonEvent = (): void => {
    dispatch(switchPauseStatus(!isPaused));
    !isPaused ? pauseMusic() : playMusic();
  };
  //
  useEffect(() => {
    loadMusic(musicIndex);
  }, [isLoading, albumList]);

  useEffect(() => {
    trackOrder.current.currentTime = offsetCurrentTime;
  }, [offsetCurrentTime]);
  //
  return (
    <nav
      className={`nav ${isPlayerPage ? "nav--player" : ""} ${
        isLightTheme ? "light" : ""
      }`}
    >
      <button
        ref={prevBtn}
        disabled={isLoading ? true : false}
        onClick={prevSong}
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--prev"
            : "nav__button nav__button--prev"
        }
      >
        <SvgTemplate id="arrow_prev_icon" />
      </button>
      <button
        ref={pauseBtn}
        disabled={isLoading ? true : false}
        onClick={defineButtonEvent}
        className={`nav__button ${isPlayerPage ? "nav__button--player" : ""} ${
          isPaused ? "nav__button--play" : "nav__button--pause"
        }`}
      >
        {isPaused ? <SvgTemplate id="play" /> : <SvgTemplate id="pause" />}
      </button>
      <button
        ref={nextBtn}
        disabled={isLoading ? true : false}
        onClick={nextSong}
        className={
          isPlayerPage
            ? "nav__button nav__button--player nav__button--next"
            : "nav__button nav__button--next"
        }
      >
        <SvgTemplate id="arrow__next-icon" />
      </button>
      <audio
        className="player__audio"
        muted={isAudioMuted ? true : false}
        ref={trackOrder}
      ></audio>
    </nav>
  );
};

export default Buttons;
