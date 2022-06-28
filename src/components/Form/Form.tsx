import React from 'react';

import { useNavigate } from 'react-router';

import { FiSearch } from 'react-icons/fi';
import { RiEqualizerLine } from 'react-icons/ri';

import { HiOutlineMenuAlt4, HiOutlineArrowLeft } from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
  switchSearchPageStatus
} from '../../app/slices/mainSlice';

import { switchBurgerStatus } from '../../app/slices/burgerSlice';

import { useInput } from '../../hooks/useInput';

import './form.scss';

// /. imports

const Form: React.FC = () => {
  const { isPlaylistPage, isPlayerPage, isSearchPage, isLoading } = useAppSelector(state => state.mainSlice);
  const { isBurgerOpen } = useAppSelector(state => state.burgerSlice);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchInput = useInput('');

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
    e.preventDefault();
    dispatch(switchSearchPageStatus(true));
    navigate('search');
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
            <RiEqualizerLine size={25} color={'#eaf0ff'} />
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
      ) :

        isSearchPage ? (
          <div className="header__section">
            <button
              className="header__button header__button--search"
              type="button"
              onClick={goBack}
            >
              <HiOutlineArrowLeft size={25} color={'#eaf0ff'} />
            </button>
            <form className="form" action="#" onSubmit={(e) => e.preventDefault()}>
              <div className="form__search">
                <input
                  className="form__input"
                  type="text"
                  disabled={isLoading || isBurgerOpen}
                  onChange={(e) => searchInput.onInputChange({ name: 'search', value: e.target.value })}
                  value={searchInput.value}
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
              <form className="form" action="#" onSubmit={(e) => relocateToSearchPage(e)}>
                <div className="form__search">
                  <input
                    className="form__input"
                    type="text"
                    disabled={isLoading || isBurgerOpen}
                    onChange={(e) => searchInput.onInputChange({ name: 'search', value: e.target.value })}
                    value={searchInput.value}
                  />
                  <button
                    className={
                      isBurgerOpen
                        ? 'form__button form__button--search opacity'
                        : 'form__button form__button--search'
                    }
                    type="button"
                    onClick={relocateToSearchPage}
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
