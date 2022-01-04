import React, { useMemo } from "react";
import Card from "./CardTemplate";
import "./card.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode]);

const CardList = ({ recomendedList }) => {
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

export default CardList;
