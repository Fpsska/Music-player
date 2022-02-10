import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, EffectCoverflow } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);

const SliderCard = ({ isPlayerPage }) => {
  const { albumList, mockData, isLoading } = useSelector(
    (state) => state.mainSlice
  );
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
          <SwiperSlide key={item.id}>
            <Card
              artist={item.artist.name}
              track={item.title}
              image={item.artist.picture_medium}
              song={item.preview}
            />
          </SwiperSlide>
        );
      }),
    [albumList]
  );

  const mockList = useMemo(
    () =>
      mockData.map((item) => {
        console.log("mock");
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
    [isLoading]
  );

  return (
    <>
      <Swiper
        slidesPerView={isPlayerPage ? "auto" : 1.7}
        spaceBetween={30}
        centeredSlides={isPlayerPage ? true : false}
        freeMode={isPlayerPage ? false : true}
        effect={isPlayerPage ? "coverflow" : ""}
        coverflowEffect={isPlayerPage ? coverEffect : ""}
        className="mySwiper"
      >
        {isLoading ? mockList : list}
      </Swiper>
    </>
  );
};

export default SliderCard;
