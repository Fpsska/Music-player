import React from 'react';

import { useNavigate } from 'react-router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

// /. imports

interface propTypes {
    role?: string;
}

const ReturnButton: React.FC<propTypes> = ({ role }) => {
    const navigate = useNavigate();

    // /. hooks

    const goBack = (): void => {
        setTimeout(() => {
            navigate('/Music-player');
        }, 200);
    };

    // /. functions

    return (
        <button
            className={`${role ? role : ''}`}
            type="button"
            aria-label="return to home page"
            onClick={goBack}
        >
            <HiOutlineArrowLeft
                size={25}
                color={'#eaf0ff'}
            />
        </button>
    );
};

export default ReturnButton;
