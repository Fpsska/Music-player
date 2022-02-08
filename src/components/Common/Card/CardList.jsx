import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Card from "./CardTemplate";
import "./card.scss";

const CardList = () => {
  const { albumList } = useSelector((state) => state.mainSlice);

  const list = useMemo(
    () =>
      albumList.map((item) => {
        return (
          <Card
              key={item.id}
              artist={item.artist.name}
              track={item.title}
              image={item.artist.picture_medium}
              // song={item.preview}
          />
        );
      }),
    [albumList]
  );

  return <>{list}</>;
};

export default CardList;
