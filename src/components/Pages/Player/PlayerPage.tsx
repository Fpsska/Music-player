import React from 'react';

import { BiVolumeLow } from 'react-icons/bi';
import { IoMdRepeat } from 'react-icons/io';
import { FiShuffle } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { switchMutedStatus } from '../../../app/slices/playerSlice';

import { RootState } from '../../../app/store';

import Slider from '../../Slider/Slider';

// /. imports

const PlayerPage: React.FC = () => {

  const {
    songDuration,
    currentTimeProgress,
    isAudioMuted,
    albumList
  } = useAppSelector((state: RootState) => state.playerSlice);

  const dispatch = useAppDispatch();
  //
  const muteVolume = (): void => {
    dispatch(switchMutedStatus(!isAudioMuted));
  };
  // 
  return (
    <div className="container">
      <div className="player">
        <div className="player__slider">
          <Slider data={albumList} name={'playerlist'} />
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
            <div> {/* NAME */}
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
            </div>
          </div>
          <div
            className="player__time time">
            <span className="time__current">
              {currentTimeProgress}
            </span>
            <span className="time__length">
              {songDuration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
