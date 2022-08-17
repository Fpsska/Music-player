import React from 'react';
import { useEffect } from 'react';

import { Outlet } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { switchLoadingStatus } from '../../app/slices/mainSlice';
import { fetchAlbumsData } from '../../app/slices/playerSlice';

// /. imports

const Layout: React.FC = () => {
  const { isPlayerPage } = useAppSelector(state => state.mainSlice);
  const { status } = useAppSelector(state => state.playerSlice);
  const dispatch = useAppDispatch();
  //
  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        dispatch(switchLoadingStatus(false));
      }, 2000);
    } 
  }, [status]);

  useEffect(() => {
    dispatch(fetchAlbumsData());
  }, []);
  // 
  return (
    <>
      <Header />
      <main className="main">
        <div
          className={isPlayerPage ? 'page page--player' : 'page'}
        >
          <div className="page__wrapper">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
