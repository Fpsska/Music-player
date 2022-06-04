import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { FiSearch } from 'react-icons/fi';
import { RiEqualizerLine } from 'react-icons/ri';
import { HiOutlineMenuAlt4, HiOutlineArrowLeft } from 'react-icons/hi';

import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
  switchSearchPageStatus
} from '../../app/slices/mainSlice';
import { switchBurgerStatus } from '../../app/slices/burgerSlice';
import { RootState } from '../../app/store';
import './form.scss';

// /. imports

const Form: React.FC = () => {
  const { isPlaylistPage, isPlayerPage, isSearchPage, isLoading } = useSelector(
    (state: RootState) => state.mainSlice
  );
  const { isBurgerOpen } = useSelector(
    (state: RootState) => state.burgerSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 
  const goBack = (): void => {
    setTimeout(() => {
      navigate('/Music-player');
      dispatch(switchPlaylistPageStatus(false));
      dispatch(switchPlayerPageStatus(false));
      dispatch(switchSearchPageStatus(false));
    }, 200);
  };

  const openBurger = (): void => {
    dispatch(switchBurgerStatus(true));
  };

  const relocateToSearchPage = (e: React.SyntheticEvent): void => {
    console.log('SUBMITED');
    setTimeout(() => {
      e.preventDefault();
      dispatch(switchSearchPageStatus(true));
      navigate('search');
    }, 1000);
  };
  // 
  return (
    <>
      {isPlaylistPage ? (
        <div
          className="header__section"
        >
          <button
            className="header__button header__button--playlist"
            type="button"
            onClick={goBack}
          >
            <HiOutlineArrowLeft size={25} color={'#eaf0ff'} />
          </button>
          <button
            className="header__button header__button--playlist"
            type="button"
          >
            <RiEqualizerLine size={25} color={'#eaf0ff'}/>
          </button>
        </div>
      ) : isPlayerPage ? (
        <div className="header__section header__section--player">
          <button
            className="header__button header__button--player"
            type="button"
            onClick={goBack}
          >
            <HiOutlineArrowLeft size={25} color={'#eaf0ff'} />
          </button>
          <h1 className="header__title">Playing Now</h1>
        </div>
      ) : isSearchPage ? (
        <div className="header__section">
          <button
            className="header__button header__button--search"
            type="button"
            onClick={goBack}
          >
            <HiOutlineArrowLeft size={25} color={'#eaf0ff'} />
          </button>
          <form className="form" action="#">
            <div className="form__search">
              <input
                className="form__input"
                type="text"
                disabled={isLoading ? true : isBurgerOpen ? true : false}
              />
              <button
                className={
                  isBurgerOpen
                    ? 'form__button form__button--search opacity'
                    : 'form__button form__button--search'
                }
                type="button"
              >
                <FiSearch size={25} color={'#eaf0ff'} />
              </button>
            </div>
          </form>
        </div>
      )
        :
        (
          <div className="header__section">
            <button
              className="header__button header__button--menu"
              type="button"
              onClick={openBurger}
            >
              <HiOutlineMenuAlt4 size={25} color={'#eaf0ff'} />
            </button>
            <form className="form" action="#" onSubmit={relocateToSearchPage}>
              <div className="form__search">
                <input
                  className="form__input"
                  type="text"
                  disabled={isLoading ? true : isBurgerOpen ? true : false}
                />
                <button
                  onClick={(e) => relocateToSearchPage(e)}
                  className={
                    isBurgerOpen
                      ? 'form__button form__button--search opacity'
                      : 'form__button form__button--search'
                  }
                  type="button"
                >
                  <FiSearch size={25} color={'#eaf0ff'} />
                </button>
              </div>
            </form>
          </div>
        )}
    </>
  );
};

export default Form;
