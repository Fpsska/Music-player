import React from 'react';

import { useNavigate } from 'react-router';

import { FiSearch } from 'react-icons/fi';

import { useAppSelector } from 'app/hooks';

import { useInput } from 'hooks/useInput';

import './search-form.scss';

// /. imports

const SearchForm: React.FC = () => {
    const { isLoading } = useAppSelector(state => state.mainSlice);
    const { isBurgerOpen } = useAppSelector(state => state.burgerSlice);

    const navigate = useNavigate();

    const searchInput = useInput('');

    // /. hooks

    const relocateToSearchPage = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        navigate('search');
        console.log('SUBMITED');
    };

    // /. functions

    return (
        <form
            className="search-form"
            action="#"
            onSubmit={e => relocateToSearchPage(e)}
        >
            <div className="search-form__search">
                <input
                    className="search-form__input"
                    type="text"
                    disabled={isLoading || isBurgerOpen}
                    onChange={e =>
                        searchInput.onInputChange({
                            name: 'search',
                            value: e.target.value
                        })
                    }
                    value={searchInput.value}
                />
                <button
                    className={
                        isBurgerOpen
                            ? 'search-form__button search-form__button--search opacity'
                            : 'search-form__button search-form__button--search'
                    }
                    type="submit"
                    aria-label="search trak"
                    disabled={isLoading || isBurgerOpen}
                    onClick={relocateToSearchPage}
                >
                    <FiSearch
                        size={25}
                        color={'#eaf0ff'}
                    />
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
