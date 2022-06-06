import React, { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';

import { RootState } from '../../app/store';

import Card from './CardTemplate';
import './card.scss';

// /. imports

const CardList: React.FC = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.mainSlice);
  const { albumList, mockData } = useAppSelector((state: RootState) => state.playerSlice);

  const list = useMemo(
    () =>
      albumList.map((item) => {
        return (
          <Card
            key={item.id}
            id={item.id}
            artist={item.artist.name}
            track={item.title}
            image={item.artist.picture_medium}
            isFavourite={item.isFavourite}
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
