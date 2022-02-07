import React, { useMemo, useState } from "react";
import Card from "../Card/CardTemplate";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, EffectCoverflow } from "swiper";
import { useSelector } from "react-redux";
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);

const SliderCard = ({ isPlayerPage, trackOrder, musicIndex }) => {
  const { albumList } = useSelector((state) => state.mainSlice);
  //
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
              trackOrder={trackOrder}
              musicIndex={musicIndex}
            />
          </SwiperSlide>
        );
      }),
    [albumList]
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
