import React, { useMemo, useState } from "react";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, EffectCoverflow } from "swiper";
import { useSelector } from "react-redux";
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);

const SliderCard = ({ isPlayerPage, trackOrder, musicIndex }) => {
  const { playList, recomendedList } = useSelector((state) => state.mainSlice);
  //
  const generalList = recomendedList.concat(playList);
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
      generalList.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <Card
              image={item.image}
              artist={item.artist}
              song={item.song}
              trackOrder={trackOrder}
              musicIndex={musicIndex}
            />
          </SwiperSlide>
        );
      }),
    [generalList]
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
        {list}
      </Swiper>
    </>
  );
};

export default SliderCard;
