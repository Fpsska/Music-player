import React, { useMemo } from "react";
import Card from "../Card/CardTemplate";
import { RootState } from "../../app/store";
import { albumListTypes } from "../../models/mainSliceTypes";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
import { useSelector } from "react-redux";
// install Swiper modules
SwiperCore.use([FreeMode]);

interface SliderPlayListPropTypes {
  albumList: albumListTypes[];
}

const SliderPlayList: React.FC<SliderPlayListPropTypes> = ({ albumList }) => {
  const { mockData, isLoading } = useSelector(
    (state: RootState) => state.mainSlice
  );
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
          centeredSlides: false,
        },
        360: {
          slidesPerView: 1.7,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3.2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 30,
        },
      }}
      className="mySwiper"
    >
      {isLoading ? mockList : list}
    </Swiper>
  );
};

export default SliderPlayList;
