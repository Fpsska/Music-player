import React, { useEffect, useState } from 'react';

import { BiTrash } from 'react-icons/bi';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { RootState } from '../../../app/store';

import { setLikedData } from '../../../app/slices/playerSlice';

import './searchPage.scss';

// /. imports

const SearchPage: React.FC = () => {

    const { isLoading } = useAppSelector((state: RootState) => state.mainSlice);
    const {
        likedData,
        songDuration,
        isPaused
    } = useAppSelector((state: RootState) => state.playerSlice);

    const [isEmpty, setEmptyStatus] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (likedData.length === 0) {
            setEmptyStatus(true);
        }
        console.log(likedData)
    }, [likedData]);

    useEffect(() => {
        dispatch(setLikedData());  // hide all items, which has flag FALSE
    }, []);

    return (
        <div className="container">
            <div className="search">
                <h3 className="search__title">Tracks</h3>
                <div className="search__wrapper">
                    <div className="search__list">
                        {
                            isEmpty ? <h3 className="search__title search__title--empty">No matches</h3>
                                :
                                likedData.map(item => {
                                    return (
                                        <div className="search__list-item" key={item.id} id={String(item.id)}>
                                            <img className="search__list-image" src={item.artist.picture_medium} alt="album" />
                                            <div className="search__list-information">
                                                <span className="search__list-song">{item.title}</span>
                                                <span className="search__list-artist">{item.artist.name}</span>
                                            </div>
                                            <div className="search__list-controls">
                                                <button className="search__list-button">
                                                    <BiTrash size={18} color={'#8996b8'} />
                                                </button>
                                                <span className="search__list-time">{isLoading ? '0:00' : isPaused ? '0:00' : songDuration}</span>
                                            </div>
                                            <span className="id">{item.id}</span>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;