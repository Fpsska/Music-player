import React, { useMemo } from "react";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode]);

const SliderPlayList = ({ playList, isPlayerPage }) => {
  //
  const list = useMemo(
    () =>
      playList.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <Card image={item.image} artist={item.artist} song={item.song} />
          </SwiperSlide>
        );
      }),
    [playList]
  );

  return (
    <Swiper
      slidesPerView={isPlayerPage ? "auto" : 1.7}
      spaceBetween={30}
      freeMode={isPlayerPage ? false : true}
      className="mySwiper"
    >
      {list}
    </Swiper>
  );
};

export default SliderPlayList;
