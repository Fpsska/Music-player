import React, { useState, useEffect } from 'react';

import SwiperCore, { FreeMode, EffectCoverflow, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { albumListTypes } from '../../Types/mainSliceTypes';

import {
    setCurrentmusicIndex,
    switchPauseStatus,
    setCurrentCardID
} from '../../app/slices/playerSlice';

import { useLoadMusic } from '../../hooks/useLoadMusic';

import Card from '../Card/CardTemplate';

// Import Swiper React components
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);

// /. imports

interface SliderPropTypes {
    data: albumListTypes[];
    name: string;
}

// ./ interfaces

const Slider: React.FC<SliderPropTypes> = props => {
    const { data, name } = props;

    const { isLoading, isPlayerPage } = useAppSelector(
        state => state.mainSlice
    );
    const { mockData, albumList, musicIndex } = useAppSelector(
        state => state.playerSlice
    );

    const dispatch = useAppDispatch();

    const [currentData, setCurrentData] = useState<albumListTypes[]>(data);
    const [coverEffect] = useState({
        rotate: 45,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows: false
    });

    const [breakpoints] = useState({
        320: {
            slidesPerView: 1,
            spaceBetween: 40,
            centeredSlides: false
        },
        360: {
            slidesPerView: 1.5,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1366: {
            slidesPerView: 2.5,
            spaceBetween: 30
        }
    });

    const { loadMusic } = useLoadMusic();

    useEffect(() => {
        switch (name) {
            case 'recomended':
                setCurrentData(data.slice(0, 5));
                break;
            case 'playlist':
                setCurrentData([...data].reverse());
                break;
            case 'playerlist':
                setCurrentData(data);
                break;
            case 'test':
                setCurrentData(data);
                break;
        }
    }, [data, name]);

    const slideChangeHandler = (): void => {
        if (isPlayerPage && !isLoading) {
            dispatch(setCurrentmusicIndex(musicIndex + 1));

            if (musicIndex >= albumList.length - 1) {
                dispatch(setCurrentmusicIndex(0));
            }

            if (musicIndex <= 0) {
                dispatch(setCurrentmusicIndex(albumList.length - 1));
            }
            // value check

            loadMusic({ songObj: albumList[musicIndex] });

            dispatch(switchPauseStatus(false));

            // dispatch(setCurrentCardID());
            dispatch(
                setCurrentCardID(
                    +Array.from(
                        document.querySelectorAll('.swiper-slide')
                    ).filter(item =>
                        item.classList.contains('swiper-slide-visible')
                    )[0].children[0].id
                )
            );

            (
                document.querySelector(
                    '.player__audio'
                ) as HTMLVideoElement | null
            )?.play();
        }
    };
    //
    return (
        <Swiper
            className="mySwiper"
            freeMode={name === 'playerlist' ? false : true}
            slidesPerView={1}
            spaceBetween={name === 'playerlist' ? 30 : 0}
            centeredSlides={name === 'playerlist' ? true : false}
            effect={'coverflow'}
            coverflowEffect={coverEffect}
            navigation={name === 'playerlist' ? true : false}
            modules={[Navigation]}
            breakpoints={name === 'playerlist' ? {} : breakpoints}
            onSlideChange={() => slideChangeHandler()}
        >
            {isLoading
                ? mockData.map(item => {
                      return (
                          <SwiperSlide key={item.id}>
                              <div className="loading">
                                  <div
                                      className={
                                          isPlayerPage
                                              ? 'loading__card loading__card--player'
                                              : 'loading__card'
                                      }
                                  >
                                      <div className="loading__preview animated"></div>
                                      <div className="loading__text animated"></div>
                                      <div className="loading__text animated"></div>
                                  </div>
                              </div>
                          </SwiperSlide>
                      );
                  })
                : currentData.map(item => {
                      return (
                          <SwiperSlide key={item.id}>
                              <Card
                                  id={item.id}
                                  artist={item.artist.name}
                                  track={item.title}
                                  image={item.artist.picture_medium}
                                  isFavourite={item.isFavourite}
                              />
                          </SwiperSlide>
                      );
                  })}
        </Swiper>
    );
};

export default Slider;
