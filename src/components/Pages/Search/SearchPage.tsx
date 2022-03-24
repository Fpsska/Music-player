import React from "react";
import { useSelector } from "react-redux";
import SvgTemplate from "../../Common/SvgTemplate";
import { RootState } from "../../../app/store";
import "./searchPage.scss"

const SearchPage: React.FC = () => {
    const { albumList, songDuration, isLoading, isPaused } = useSelector((state: RootState) => state.mainSlice)
    return (
        <div className="container">
            <div className="search">
                <h3 className="search__title">Tracks</h3>
                <div className="search__list">
                    <div className="list">
                        {
                            albumList.map(item => {
                                return (
                                    <div className="list__item" key={item.id}>
                                        <img className="list__image" src={item.artist.picture_medium} alt="album" />
                                        <div className="list__information">
                                            <span className="list__song">{item.title}</span>
                                            <span className="list__artist">{item.artist.name}</span>
                                        </div>
                                        <div className="list__controls">
                                            <button className="list__button">
                                                <SvgTemplate id="like" />
                                            </button>
                                            <span className="list__song-duration">{isLoading ? "0:00" : isPaused ? "0:00" : songDuration}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;