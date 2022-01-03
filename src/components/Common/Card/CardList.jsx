import React from "react";
import Card from "./CardTemplate";
import { useSelector } from "react-redux";
import "./card.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode]);

const CardList = () => {
  const { recomendedList } = useSelector((state) => state.mainSlice);

  const RecomendedList = recomendedList.map((item) => {
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
    <div className="recommendation">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={0}
        freeMode={true}
        className="mySwiper"
      >
        {RecomendedList}
      </Swiper>
    </div>
  );
};

export default CardList;
