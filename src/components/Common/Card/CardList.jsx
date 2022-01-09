import React, { useMemo } from "react";
import Card from "./CardTemplate";
import "./card.scss";
import { useSelector } from "react-redux";

const CardList = () => {
  const { playList, recomendedList } = useSelector((state) => state.mainSlice);
  //
  const generalList = recomendedList.concat(playList);
  //
  const list = useMemo(
    () =>
      generalList.map((item) => {
        return (
          <Card
            key={item.id}
            image={item.image}
            artist={item.artist}
            song={item.song}
          />
        );
      }),
    [generalList]
  );

  return <>{list}</>;
};

export default CardList;
