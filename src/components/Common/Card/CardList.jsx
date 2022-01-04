import React, { useMemo } from "react";
import Card from "./CardTemplate";
import "./card.scss";

const CardList = ({ recomendedList }) => {
  const list = useMemo(
    () =>
      recomendedList.map((item) => {
        return (
          <Card
            key={item.id}
            image={item.image}
            artist={item.artist}
            song={item.song}
          />
        );
      }),
    [recomendedList]
  );

  return <>{list}</>;
};

export default CardList;
