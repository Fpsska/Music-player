import React, { useState, useEffect } from 'react';

import SwiperCore, { FreeMode, EffectCoverflow, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import CardTemplate from 'components/ui/Card/CardTemplate';

import { useMusicController } from 'hooks/useMusicController';

import { determineCurrentPlayerData } from 'utils/helpers/determineCurrentPlayerData';

import { swapArrayElementsPositions } from 'utils/helpers/swapArrayElementsPositions';

import { IalbumList } from 'types/mainSliceTypes';

import {
    setCurrentmusicIndex,
    setCurrentCardID,
    setCurrentPlayerData
} from 'app/slices/playerSlice';

import { useAppDispatch, useAppSelector } from 'app/hooks';

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
    const {
        mockData,
        albumList,
        currentPlayerData,
        currentCardID,
        musicIndex
    } = useAppSelector(state => state.playerSlice);

    const [currentData, setCurrentData] =
        useState<IalbumList[]>(currentPlayerData);
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

    const audioEl = document.querySelector(
        '.player__audio'
    ) as HTMLAudioElement;
    const isSliderActive = pagesStatuses.isPlayerPage && !isLoading;
    const isDataEmpty = isLoading || currentData.length === 0;

    const { resetBarState, playMusic } = useMusicController(audioEl);

    // /. hooks

    const onNextSliderSwipe = (swiper: any): void => {
        // console.log('next swipe');
        if (musicIndex >= currentData.length - 1) {
            // console.log(swiper)
        } else {
            dispatch(setCurrentmusicIndex(musicIndex + 1));

            playMusic();
            resetBarState();
        }
    };

    const onPrevSliderSwipe = (swiper: any): void => {
        // console.log('prev swipe');
        if (musicIndex <= 0) {
            // console.log(swiper)
        } else {
            dispatch(setCurrentmusicIndex(musicIndex - 1));

            playMusic();
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
        // for determine render data of all HomePage.tsx sliders
        if (role !== 'playerlist') {
            setCurrentData(determineCurrentPlayerData(albumList, role));
        }
        return;
    }, [albumList, role]);

    useEffect(() => {
        if (role === 'playerlist') {
            setCurrentData(currentPlayerData);
            // dispatch(
            //     setCurrentPlayerData(
            //         swapArrayElementsPositions(currentPlayerData, currentCardID)
            //     )
            // );
            // console.log(currentPlayerData);
            // console.log(
            //     swapArrayElementsPositions(currentPlayerData, currentCardID)
            // );
        }
    }, [currentPlayerData, role]);

    // useEffect(() => {
    //     console.log('currentD', currentData);
    // }, [currentData]);

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
            // onSlideChange={() => isSliderActive && slideChangeHandler()}
            onSlideNextTransitionEnd={swiper =>
                isSliderActive && onNextSliderSwipe(swiper)
            }
            onSlidePrevTransitionEnd={swiper =>
                isSliderActive && onPrevSliderSwipe(swiper)
            }
        >
            {isDataEmpty
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
                : currentData.map(song => {
                      return (
                          <SwiperSlide key={song.id}>
                              <CardTemplate
                                  id={song.id}
                                  artist={song.artist.name}
                                  track={song.title}
                                  image={song.artist.picture_medium}
                                  isFavourite={song.isFavourite}
                                  role={role}
                              />
                          </SwiperSlide>
                      );
                  })}
        </Swiper>
    );
};

export default Slider;
