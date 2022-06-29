import React, { useEffect, useState } from 'react';

import { BsHeart } from 'react-icons/bs';
import { BiVolumeLow } from 'react-icons/bi';
import { IoMdRepeat } from 'react-icons/io';
import { FiShuffle } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { switchMutedStatus, addToLikedAlbum, setCurrentCardID } from '../../../app/slices/playerSlice';

import Slider from '../../Slider/Slider';

// /. imports

const PlayerPage: React.FC = () => {

  const {
    songDuration,
    currentTimeProgress,
    isAudioMuted,
    albumList,
    likedData,
    currentCardID
  } = useAppSelector(state => state.playerSlice);

  const { isLoading } = useAppSelector(state => state.mainSlice);

  const [isAlreadyAdded, setAddedStatus] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  //
  const muteVolume = (): void => {
    dispatch(switchMutedStatus(!isAudioMuted));
  };

  const addToFavorite = (): void => {
    dispatch(addToLikedAlbum({ id: currentCardID, status: true }));
    console.log('added');
  };

  useEffect(() => { // check equal items in likedData
    likedData.some(item => item.id === currentCardID) ? setAddedStatus(true) : setAddedStatus(false);
  }, [likedData, currentCardID]);

  useEffect(() => { // set initial first card ID
    !isLoading && dispatch(setCurrentCardID(+Array.from(document.querySelectorAll('.swiper-slide')).filter(item => item.classList.contains('swiper-slide-active'))[0].children[0].id));
  }, [isLoading]);
  // 
  return (
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
            <button
              className="player__button player__button--like"
              type="button"
              onClick={() => !isAlreadyAdded && addToFavorite()}
            >
              <BsHeart size={18} color={'#8996b8'} />
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
  )
};

export default PlayerPage;
