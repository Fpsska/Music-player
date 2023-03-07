import React from 'react';

import { useAppSelector } from 'app/hooks';

import { IalbumList } from 'types/mainSliceTypes';

import CardTemplate from './CardTemplate';

import './card.scss';

// /. imports

interface propTypes {
    data: IalbumList[];
}

const CardList: React.FC<propTypes> = ({ data }) => {
    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { mockData } = useAppSelector(state => state.playerSlice);

    // /. hooks

    return (
        <>
            {isLoading
                ? mockData.map(item => {
                      return (
                          <div
                              className="loading"
                              key={item.id}
                          >
                              <div className="loading__card loading__card--playlist">
                                  <div className="loading__preview animated"></div>
                                  <div className="loading__text animated"></div>
                                  <div className="loading__text animated"></div>
                              </div>
                          </div>
                      );
                  })
                : data.map(item => {
                      return (
                          <CardTemplate
                              key={item.id}
                              id={item.id}
                              artist={item.artist.name}
                              track={item.title}
                              image={item.artist.picture_medium}
                              isFavourite={item.isFavourite}
                              data={data}
                          />
                      );
                  })}
        </>
    );
};

export default CardList;
