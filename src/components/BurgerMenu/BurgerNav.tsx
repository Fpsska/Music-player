import React from 'react';

import { useNavigate } from 'react-router';

import { BsHeart, BsQuestionSquare } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { RiContactsLine } from 'react-icons/ri';
import { IoEarthOutline, IoSettingsOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
    switchInformationStatus,
    switchContactInfoStatus,
    switchBurgerStatus,
    switchFaqsInfoStatus
} from '../../app/slices/burgerSlice';

import Details from '../Details/Details';

// /. imports

const BurgerNav: React.FC = () => {
    const { isInformationVisible, isContactInfo, isFaqsInfo } = useAppSelector(
        state => state.burgerSlice
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const displaySocial = (): void => {
        !isFaqsInfo && isInformationVisible
            ? dispatch(switchInformationStatus(false))
            : dispatch(switchInformationStatus(true));
        dispatch(switchContactInfoStatus(true));
        dispatch(switchFaqsInfoStatus(false));
    };

    const displayFAQs = (): void => {
        !isContactInfo && isInformationVisible
            ? dispatch(switchInformationStatus(false))
            : dispatch(switchInformationStatus(true));
        dispatch(switchFaqsInfoStatus(true));
        dispatch(switchContactInfoStatus(false));
    };

    const relocateToSearchPage = (): void => {
        setTimeout(() => {
            navigate('search');
            dispatch(switchBurgerStatus(false));
        }, 200);
    };

    // /. functions

    return (
        <nav className="burger__menu">
            <ul className={isInformationVisible ? 'menu opened' : 'menu'}>
                <li className="menu__item">
                    <button
                        className="menu__button"
                        type="button"
                        aria-label="go to profile page"
                    >
                        <RiContactsLine
                            size={20}
                            color={'#8996b8'}
                        />
                        <span className="menu__text">Profile</span>
                    </button>
                </li>
                <li className="menu__item">
                    <button
                        className="menu__button"
                        type="button"
                        aria-label="go to favourite playlist"
                    >
                        <BsHeart
                            size={20}
                            color={'#8996b8'}
                        />
                        <span
                            className="menu__text"
                            onClick={relocateToSearchPage}
                        >
                            Liked Songs
                        </span>
                    </button>
                </li>
                <li className="menu__item">
                    <button
                        className="menu__button"
                        type="button"
                        aria-label="switch application language"
                    >
                        <IoEarthOutline
                            size={20}
                            color={'#8996b8'}
                        />
                        <span className="menu__text">Language</span>
                    </button>
                </li>
                <li
                    className="menu__item"
                    onClick={displaySocial}
                >
                    <button
                        className="menu__button"
                        type="button"
                        aria-label="show contacts"
                    >
                        <BiMessageDetail
                            size={22}
                            color={'#8996b8'}
                        />
                        <span className="menu__text">Contact us</span>
                    </button>
                </li>
                <li
                    className="menu__item"
                    onClick={displayFAQs}
                >
                    <button
                        className="menu__button"
                        type="button"
                        aria-label={
                            isInformationVisible
                                ? 'hide questions list'
                                : 'show questions list'
                        }
                    >
                        <BsQuestionSquare
                            size={18}
                            color={'#8996b8'}
                        />
                        <span className="menu__text">FAQs</span>
                    </button>
                </li>
                <li className="menu__item">
                    <button
                        className="menu__button"
                        type="button"
                        aria-label="open settings"
                    >
                        <IoSettingsOutline
                            size={20}
                            color={'#8996b8'}
                        />
                        <span className="menu__text">Settings</span>
                    </button>
                </li>
            </ul>
            {isInformationVisible && <Details />}
        </nav>
    );
};

export default BurgerNav;
