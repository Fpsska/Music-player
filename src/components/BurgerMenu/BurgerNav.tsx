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
    //
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
    //
    return (
        <nav className="burger__menu">
            <ul className={isInformationVisible ? 'menu opened' : 'menu'}>
                <li className="menu__item">
                    <RiContactsLine
                        size={20}
                        color={'#8996b8'}
                    />
                    <a
                        className="menu__link"
                        href="https://github.com/Fpsska"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Profile
                    </a>
                </li>
                <li className="menu__item">
                    <BsHeart
                        size={20}
                        color={'#8996b8'}
                    />
                    <span
                        className="menu__link"
                        onClick={relocateToSearchPage}
                    >
                        Liked Songs
                    </span>
                </li>
                <li className="menu__item">
                    <IoEarthOutline
                        size={20}
                        color={'#8996b8'}
                    />
                    <span className="menu__link">Language</span>
                </li>
                <li
                    className="menu__item"
                    onClick={displaySocial}
                >
                    <BiMessageDetail
                        size={22}
                        color={'#8996b8'}
                    />
                    <span className="menu__link">Contact us</span>
                </li>
                <li
                    className="menu__item"
                    onClick={displayFAQs}
                >
                    <BsQuestionSquare
                        size={18}
                        color={'#8996b8'}
                    />
                    <span className="menu__link">FAQs</span>
                </li>
                <li className="menu__item">
                    <IoSettingsOutline
                        size={20}
                        color={'#8996b8'}
                    />
                    <span className="menu__link">Settings</span>
                </li>
            </ul>
            {isInformationVisible ? <Details /> : <></>}
        </nav>
    );
};

export default BurgerNav;
