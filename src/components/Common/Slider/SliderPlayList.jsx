import React, { useMemo } from "react";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode]);

const SliderPlayList = ({ albumList, isPlayerPage }) => {
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
            />
          </SwiperSlide>
        );
      }),
    [albumList]
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
