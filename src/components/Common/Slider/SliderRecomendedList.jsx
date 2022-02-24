import React, { useMemo } from "react";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
import { useSelector } from "react-redux";
// install Swiper modules
SwiperCore.use([FreeMode]);

const SliderRecomendedList = ({ albumList }) => {
  const { isLoading, mockData } = useSelector((state) => state.mainSlice);
  const recomendedList = albumList.slice(0, 4);
  //
  const list = useMemo(
    () =>
      recomendedList.map((item) => {
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
    [recomendedList]
  );

  const mockList = useMemo(
    () =>
      mockData.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <div className="loading">
              <div className="loading__card">
                <div className="loading__preview animated"></div>
                <div className="loading__text animated"></div>
                <div className="loading__text animated"></div>
              </div>
            </div>
          </SwiperSlide>
        );
      }),
    [isLoading]
  );

  return (
    <Swiper
      freeMode={true}
      breakpoints={{
        320: {
          slidesPerView: 1.4,
          spaceBetween: 40,
          centeredSlides: false
        },
        360: {
          slidesPerView: 1.7,
          spaceBetween: 30
        },
        768: {
          slidesPerView: 3.2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 30
        },
      }}
      className="mySwiper"
    >
      {isLoading ? mockList : list}
    </Swiper>
  );
};

export default SliderRecomendedList;
