import React from 'react';

import Form from './HeaderBar';
import './header.scss';

// /. imports

const Header: React.FC = () => {
    return (
        <header className="header">
            <Form />
        </header>
    );
};

export default Header;
