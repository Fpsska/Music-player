import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Card from "./CardTemplate";
import "./card.scss";
import { RootState } from "../../app/store";

const CardList: React.FC = () => {
  const { albumList, mockData, isLoading } = useSelector(
    (state: RootState) => state.mainSlice
  );

  const list = useMemo(
    () =>
      albumList.map((item) => {
        return (
          <Card
            key={item.id}
            artist={item.artist.name}
            track={item.title}
            image={item.artist.picture_medium}
          />
        );
      }),
    [albumList]
  );

  const mockList = useMemo(
    () =>
      mockData.map((item) => {
        return (
          <div className="loading loading--playlist" key={item.id}>
            <div className="loading__card loading__card--playlist">
              <div className="loading__preview loading__preview--playlist animated"></div>
              <div className="loading__text animated"></div>
              <div className="loading__text animated"></div>
            </div>
          </div>
        );
      }),
    [isLoading]
  );

  return (
    <>
      {isLoading ? (
        <div className="container container--loading">{mockList}</div>
      ) : (
        list
      )}
    </>
  );
};

export default CardList;
