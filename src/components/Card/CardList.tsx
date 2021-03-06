import React from 'react';

import { useAppSelector } from '../../app/hooks';

import Card from './CardTemplate';

import './card.scss';

// /. imports

const CardList: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.mainSlice);
  const { albumList, mockData } = useAppSelector(state => state.playerSlice);

  return (
    <>
      {
        isLoading
          ?
          mockData.map(item => {
            return (
              <div className="loading" key={item.id}>
                <div className="loading__card loading__card--playlist">
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
                id={item.id}
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
