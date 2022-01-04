import React from "react";
import { useSelector } from "react-redux";
import CardList from "../../Common/Card/CardList";

const HomePage = () => {
  const { recomendedList, playList } = useSelector((state) => state.mainSlice);

  return (
    <>
      <div className="page__wrapper">
        <h1 className="page__title title">Recomended for you</h1>
        <div className="page__section page__section--recommendation">
          <div className="recommendation">
            <CardList recomendedList={recomendedList} />
          </div>
        </div>
        <div className="page__section page__section--playlist">
          <h2 className="page__title title">My Playlist</h2>
          <div className="playlist">
            <CardList recomendedList={recomendedList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
