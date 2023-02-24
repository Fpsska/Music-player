import React, { useState, useEffect } from 'react';

import SwiperCore, { FreeMode, EffectCoverflow, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { albumListTypes } from '../../Types/mainSliceTypes';

import {
    setCurrentmusicIndex,
    setCurrentCardID,
    setCurrentPlayerData
} from '../../app/slices/playerSlice';

import { useMusicController } from '../../hooks/useMusicController';
import { determineCurrentPlayerData } from '../../helpers/determineCurrentPlayerData';

import Card from '../Card/CardTemplate';

import './slider.scss';

// Import Swiper React components
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);

// /. imports

interface SliderPropTypes {
    role: string;
}

// ./ interfaces

const Slider: React.FC<SliderPropTypes> = props => {
    const { role } = props;

    const { isLoading, pagesStatuses } = useAppSelector(
        state => state.mainSlice
    );
    const { mockData, albumList, currentPlayerData, musicIndex } =
        useAppSelector(state => state.playerSlice);

    const [currentData, setCurrentData] =
        useState<albumListTypes[]>(currentPlayerData);
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

    const navigation: { [key: string]: string } = {
        prevEl: '.nav__button.prev',
        nextEl: '.nav__button.next'
    };

    const dispatch = useAppDispatch();
    const { resetBarState, playMusic } = useMusicController();

    // /. hooks

    const isValidCondition = pagesStatuses.isPlayerPage && !isLoading;
    const audioEl = document.querySelector(
        '.player__audio'
    ) as HTMLAudioElement;

    const onNextSliderSwipe = (swiper: any): void => {
        // console.log('next swipe');
        if (musicIndex >= currentData.length - 1) {
            // console.log(swiper)
        } else {
            dispatch(setCurrentmusicIndex(musicIndex + 1));

            playMusic(audioEl);
            resetBarState();
        }
    };

    const onPrevSliderSwipe = (swiper: any): void => {
        // console.log('prev swipe');
        if (musicIndex <= 0) {
            // console.log(swiper)
        } else {
            dispatch(setCurrentmusicIndex(musicIndex - 1));

            playMusic(audioEl);
            resetBarState();
        }
    };

    const slideChangeHandler = (): void => {
        // dispatch(setCurrentCardID());
        // dispatch(
        //     setCurrentCardID(
        //         +Array.from(document.querySelectorAll('.swiper-slide')).filter(
        //             item => item.classList.contains('swiper-slide-visible')
        //         )[0].children[0].id
        //     )
        // );
    };

    // /. functions

    useEffect(() => {
        // determine current data for render
        if (role === 'playerlist') {
            // use playerlist slider only for render passed data
            setCurrentData(currentPlayerData);
        } else {
            // for correct render data of all HomePage.tsx sliders
            setCurrentData(determineCurrentPlayerData(albumList, role));
        }
    }, [currentPlayerData, albumList, role]);

    // /. effects

    return (
        <Swiper
            className="mySwiper"
            freeMode={role === 'playerlist' ? false : true}
            slidesPerView={1}
            spaceBetween={role === 'playerlist' ? 30 : 0}
            centeredSlides={role === 'playerlist' ? true : false}
            effect={'coverflow'}
            coverflowEffect={coverEffect}
            navigation={role === 'playerlist' ? navigation : false}
            modules={[Navigation]}
            breakpoints={role === 'playerlist' ? {} : breakpoints}
            // onSlideChange={() => isValidCondition && slideChangeHandler()}
            onSlideNextTransitionEnd={swiper =>
                isValidCondition && onNextSliderSwipe(swiper)
            }
            onSlidePrevTransitionEnd={swiper =>
                isValidCondition && onPrevSliderSwipe(swiper)
            }
        >
            {isLoading
                ? mockData.map(item => {
                      return (
                          <SwiperSlide key={item.id}>
                              <div className="loading">
                                  <div
                                      className={
                                          pagesStatuses.isPlayerPage
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
