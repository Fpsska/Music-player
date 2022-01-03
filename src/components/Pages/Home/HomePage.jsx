import React from "react";
import CardList from "../../Common/Card/CardList";

const HomePage = () => {
  return (
    <>
      <h1 className="page__title title">Recomended for you</h1>
      <div className="page__wrapper">
        <div className="page__section page__section--recommendation">
          <CardList />
        </div>
        <div className="page__section page__section--playlist">
          <h2>My Playlist</h2>
        </div>
      </div>
    </>
  );
};

export default HomePage;
