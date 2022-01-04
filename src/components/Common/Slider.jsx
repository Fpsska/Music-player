import React, { useMemo } from "react";
import Card from "./Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode]);

const SliderCard = ({ recomendedList }) => {
  const list = useMemo(
    () =>
      recomendedList.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <Card image={item.image} artist={item.artist} song={item.song} />
          </SwiperSlide>
        );
      }),
    [recomendedList]
  );

  return (
    <>
      <Swiper
        slidesPerView={1.6}
        spaceBetween={30}
        freeMode={true}
        className="mySwiper"
      >
        {list}
      </Swiper>
    </>
  );
};

export default SliderCard;
