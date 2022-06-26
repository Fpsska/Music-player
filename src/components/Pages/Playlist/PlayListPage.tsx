import React from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../app/hooks';

import { switchPlaylistPageStatus } from '../../../app/slices/mainSlice';

import CardList from '../../Card/CardList';

// /. imports

const PlayListPage: React.FC = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  //
  const goHomePage = (): void => {
    dispath(switchPlaylistPageStatus(false));
    navigate('/Music-player');
  };

  return (
    <>
      <div className="playlist">
        <div className="container container--playlist">
          <h1 className="page__title title" onClick={goHomePage}>
            <Link to="/Music-player">Liked Songs</Link>
          </h1>
          <div className="playlist__wrapper">
            <CardList />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayListPage;
