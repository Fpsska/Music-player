import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/CardTemplate";
import {
  setTrackPreview,
  setArtistName,
  setTrackName,
  setCurrentmusicIndex,
  setTrack,
  switchPauseStatus,
  setCurrentLineProgress,
  setCurrentSlideID
} from "../../app/mainSlice";
import { RootState } from "../../app/store";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, EffectCoverflow, Navigation } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);

const SliderCard: React.FC = () => {
  const { albumList, mockData, isLoading, musicIndex, currentSlideID } = useSelector(
    (state: RootState) => state.mainSlice
  );
  const dispatch = useDispatch();
  //
  const [coverEffect] = useState({
    rotate: 50,
    stretch: 0,
    depth: 500,
    modifier: 1,
    slideShadows: false,
  });
  //

  const list = useMemo(
    () =>
      albumList.map((item) => {
        return (
          <SwiperSlide key={item.id} >
            <Card
              id={item.id}
              artist={item.artist.name}
              track={item.title}
              image={item.artist.picture_medium}
              isFavourite={item.isFavourite}
            />
          </SwiperSlide>
        );
      }),
    [albumList]
  );

  const mockList = useMemo(
    () =>
      mockData.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <div className="loading">
              <div className="loading__card">
                <div className="loading__preview--player animated"></div>
                <div className="loading__text--player animated"></div>
                <div className="loading__text--player animated"></div>
              </div>
            </div>
          </SwiperSlide>
        );
      }),
    [mockData]
  );

  // const changeSong = useMemo(() => (swiper: any): void => {
  //   if (!isLoading) {
  //     musicIndex >= albumList.length
  //       ? dispatch(setCurrentmusicIndex(1))
  //       : dispatch(setCurrentmusicIndex(musicIndex + 1));
  //     musicIndex <= 1
  //       ? dispatch(setCurrentmusicIndex(albumList.length))
  //       : dispatch(setCurrentmusicIndex(musicIndex - 1));
  //     // value check
  //     dispatch(setTrackPreview(albumList[musicIndex - 1].artist.picture_medium))
  //     dispatch(setTrack(albumList[musicIndex - 1].preview));
  //     dispatch(setArtistName(albumList[musicIndex - 1].artist.name));
  //     dispatch(setTrackName(albumList[musicIndex - 1].title));
  //     // 
  //     dispatch(setCurrentSlideID({ id: [...swiper.wrapperEl.children].filter(item => item.classList.contains("swiper-slide-active"))[0].children[0].id }))
  //   }
  // }, [isLoading, albumList, musicIndex]);
  // 
  return (
    <>
      <Swiper
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        freeMode={false}
        effect={"coverflow"}
        coverflowEffect={coverEffect}

        navigation={true}
        modules={[Navigation]}
      // onSwiper={(swiper) => dispatch(setCurrentSlideID({ id: Array.from(swiper.wrapperEl.children).filter(item => item.classList.contains("swiper-slide-active"))[0].children[0].id }))}
      // onSlideChange={(swiper) => changeSong(swiper)}
      >
        {isLoading ? mockList : list}
      </Swiper>
    </>
  );
};

export default SliderCard;
