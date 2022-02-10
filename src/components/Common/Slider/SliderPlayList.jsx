import React, { useMemo } from "react";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
import { useSelector } from "react-redux";
// install Swiper modules
SwiperCore.use([FreeMode]);

const SliderPlayList = ({ albumList, isPlayerPage }) => {
  const { mockData, isLoading } = useSelector((state) => state.mainSlice);
  const playList = albumList.slice(3, 7);
  //
  const list = useMemo(
    () =>
      playList.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <Card
              artist={item.artist.name}
              track={item.title}
              image={item.artist.picture_medium}
            />
          </SwiperSlide>
        );
      }),
    [playList]
  );

  const mockList = useMemo(
    () =>
      mockData.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <div className="loading">
              <div className="loading__card animated"></div>
              <div className="loading__text animated"></div>
              <div className="loading__text animated"></div>
            </div>
          </SwiperSlide>
        );
      }),
    [isLoading]
  );

  return (
    <Swiper
      slidesPerView={isPlayerPage ? "auto" : 1.7}
      spaceBetween={30}
      freeMode={isPlayerPage ? false : true}
      className="mySwiper"
    >
      {isLoading ? mockList : list}
    </Swiper>
  );
};

export default SliderPlayList;
