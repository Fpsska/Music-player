import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsHeart } from 'react-icons/bs';
import { BiVolumeLow } from 'react-icons/bi';
import { IoMdRepeat } from 'react-icons/io';
import { FiShuffle } from 'react-icons/fi';

import { switchMutedStatus, setFavouriteSong } from '../../../app/slices/mainSlice';
import SliderPlayerList from '../../Slider/SliderPlayerList';
import { RootState } from '../../../app/store';

// /. imports

const PlayerPage: React.FC = () => {
  //
  const { isLoading, songDuration, currentTimeProgress, isAudioMuted } =
    useSelector((state: RootState) => state.mainSlice);
  const dispatch = useDispatch();
  //
  const muteVolume = (): void => {
    dispatch(switchMutedStatus(!isAudioMuted));
  };
  // 
  const addToFavorite = (): void => {
    dispatch(setFavouriteSong());
  };
  //
  return (
    <div className="container">
      <div className="player">
        <div className="player__slider">
          <SliderPlayerList />
        </div>
        <div className="player__section">
          <div className="player__navigation">
            <button
              className="player__button player__button--volume volume"
              type="button"
              onClick={muteVolume}
            >
              <BiVolumeLow size={20} color={'#8996b8'} />
              <span
                className={
                  isAudioMuted ? 'volume__label muted' : 'volume__label'
                }
              ></span>
              <span
                className={
                  isAudioMuted ? 'volume__label muted' : 'volume__label'
                }
              ></span>
            </button>
            <button
              className="player__button player__button--repeat"
              type="button"
            >
              <IoMdRepeat size={20} color={'#8996b8'} />
            </button>
            <button
              className="player__button player__button--oder"
              type="button"
            >
              <FiShuffle size={19} color={'#8996b8'} />
            </button>
            <button
              className="player__button player__button--like"
              type="button"
              onClick={addToFavorite}
            >
              <BsHeart size={18} color={'#8996b8'} />
            </button>
          </div>
          <div
            className="player__time time">
            <span className="time__current">
              {isLoading ? '00:00' : currentTimeProgress}
            </span>
            <span className="time__length">
              {isLoading ? '00:00' : songDuration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
