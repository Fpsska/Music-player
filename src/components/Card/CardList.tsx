import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { RootState } from '../../app/store';

import Card from './CardTemplate';
import './card.scss';

// /. imports

const CardList: React.FC = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.mainSlice);
  const { albumList, mockData, currentSlideID } = useAppSelector((state: RootState) => state.playerSlice);

  return (
    <>
      {
        isLoading
          ?
          mockData.map(item => {
            return (
              <div className="loading" key={item.id}>
                <div className="loading__card">
                  <div className="loading__preview animated"></div>
                  <div className="loading__text animated"></div>
                  <div className="loading__text animated"></div>
                </div>
              </div>
            );
          })
          :
          albumList.map(item => {
            return (
              <Card
                key={item.id}
                id={currentSlideID}
                artist={item.artist.name}
                track={item.title}
                image={item.artist.picture_medium}
                isFavourite={item.isFavourite}
              />
            );
          })
      }
    </>
  );
};

export default CardList;
