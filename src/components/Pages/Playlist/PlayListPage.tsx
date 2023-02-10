import React from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../app/hooks';

import CardList from '../../Card/CardList';

// /. imports

const PlayListPage: React.FC = () => {
    const dispath = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const goHomePage = (): void => {
        navigate('/Music-player');
    };

    // /. functions

    return (
        <>
            <section className="playlist">
                <h1
                    className="page__title title"
                    onClick={goHomePage}
                >
                    <Link to="/Music-player">Liked Songs</Link>
                </h1>
                <div className="playlist__wrapper">
                    <CardList />
                </div>
            </section>
        </>
    );
};

export default PlayListPage;
