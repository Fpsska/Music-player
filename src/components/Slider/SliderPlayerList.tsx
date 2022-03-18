import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/CardTemplate";
import { RootState } from "../../app/store";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, EffectCoverflow } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow]);


const SliderCard: React.FC = () => {
  const { albumList, mockData, isLoading } = useSelector(
    (state: RootState) => state.mainSlice
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
            />
          </SwiperSlide>
        );
      }),
    [albumList]
  );

  const mockList = useMemo(
    () =>
      mockData.map((item) => {
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
    [mockData]
  );

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        freeMode={false}
        effect={"coverflow"}
        coverflowEffect={coverEffect}
        className="mySwiper"
        onSlideChange={() => console.log("slide change")}
      >
        {isLoading ? mockList : list}
      </Swiper>
    </>
  );
};

export default SliderCard;
