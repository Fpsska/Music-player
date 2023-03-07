import React from 'react';

import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import CardList from '../../Card/CardList';

// /. imports

const PlayListPage: React.FC = () => {
    const { currentPlayerData } = useAppSelector(state => state.playerSlice);

    const navigate = useNavigate();
    const { state } = useLocation();

    // /. hooks

    const goHomePage = (): void => {
        navigate('/Music-player');
    };

    // /. functions

    return (
        <section className="playlist">
            <h1
                className="page__title title"
                onClick={goHomePage}
            >
                <Link to="/Music-player">
                    {state ? state.title : 'untitled'}
                </Link>
            </h1>
            <div className="playlist__wrapper">
                <CardList data={currentPlayerData} />
            </div>
        </section>
    );
};

export default PlayListPage;
