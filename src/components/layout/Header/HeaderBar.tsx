import React from 'react';

import { RiEqualizerLine } from 'react-icons/ri';

import { HiOutlineMenuAlt4 } from 'react-icons/hi';

import { switchBurgerStatus } from 'app/slices/burgerSlice';

import ReturnButton from 'components/ui/ReturnButton/ReturnButton';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import SearchForm from 'components/ui/SearchForm/SearchForm';

// /. imports

const HeaderBar: React.FC = () => {
    const { pagesStatuses } = useAppSelector(state => state.mainSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    const openBurger = (): void => {
        dispatch(switchBurgerStatus(true));
    };

    // /. functions

    return (
        <>
            {pagesStatuses.isPlaylistPage ? (
                <div className="header__section">
                    <ReturnButton role="header__button header__button--playlist" />
                    <button
                        className="header__button header__button--playlist"
                        type="button"
                        aria-label="open equalizer settings"
                    >
                        <RiEqualizerLine
                            size={25}
                            color={'#eaf0ff'}
                        />
                    </button>
                </div>
            ) : pagesStatuses.isPlayerPage ? (
                <div className="header__section header__section--player">
                    <ReturnButton role="header__button header__button--player" />
                    <h1 className="header__title">Playing Now</h1>
                </div>
            ) : pagesStatuses.isSearchPage ? (
                <div className="header__section">
                    <ReturnButton />
                    <SearchForm />
                </div>
            ) : (
                <div className="header__section">
                    <button
                        className="header__button header__button--menu"
                        type="button"
                        aria-label="open burger menu"
                        onClick={openBurger}
                    >
                        <HiOutlineMenuAlt4
                            size={25}
                            color={'#eaf0ff'}
                        />
                    </button>
                    <SearchForm />
                </div>
            )}
        </>
    );
};

export default HeaderBar;
