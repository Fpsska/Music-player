import React from "react";
import Card from "./CardTemplate";
import "./card.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode]);

const CardList = ({ recomendedList, playList }) => {
  const list = recomendedList ? recomendedList : playList;

  const list1 = recomendedList.map((item) => {
    return (
      <SwiperSlide>
        <Card
          key={item.id}
          image={item.image}
          artist={item.artist}
          song={item.song}
        />
      </SwiperSlide>
    );
  });

  return (
    <>
      <Swiper
        slidesPerView={1.6}
        spaceBetween={30}
        freeMode={true}
        className="mySwiper"
      >
        {list1}
      </Swiper>
    </>
  );
};

export default CardList;
