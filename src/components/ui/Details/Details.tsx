import React from 'react';

import { BsTelegram } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';
import { GrInternetExplorer } from 'react-icons/gr';
import { ImMail4 } from 'react-icons/im';

import { useAppSelector } from 'app/hooks';

import QuestionList from '../Question/QuestionList';

import './details.scss';

// /. imports

const Details: React.FC = () => {
    const { isContactInfo, isFaqsInfo } = useAppSelector(
        state => state.burgerSlice
    );

    // /. hooks

    return (
        <div className="details">
            <div className="details__wrapper">
                {isContactInfo ? (
                    <ul className="details__list list">
                        <li className="list__item">
                            <span className="list__title">
                                Developed by Fpsska
                            </span>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://t.me/Fpsska"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <BsTelegram
                                        size={36}
                                        color={'#000'}
                                    />
                                    <span>Telegram</span>
                                </a>
                            </div>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="mailto:fpsska1337@gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ImMail4
                                        size={36}
                                        color={'#000'}
                                    />
                                    <span>Mail</span>
                                </a>
                            </div>
                        </li>
                        <li className="list__item">
                            <span className="list__title">
                                Designed by Om Arya
                            </span>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://omarya.in/c06bb8267814418890050935c1319f52"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <GrInternetExplorer
                                        size={36}
                                        color={'#000'}
                                    />
                                    <span>WebSite</span>
                                </a>
                            </div>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="mailto:omkumar9031@gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ImMail4
                                        size={36}
                                        color={'#000'}
                                    />
                                    <span>Mail</span>
                                </a>
                            </div>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://www.instagram.com/uiux.om"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaInstagramSquare
                                        size={36}
                                        color={'#000'}
                                    />
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </li>
                        <li className="list__item">
                            <span className="list__title">
                                Povered by Deezer API
                            </span>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://developers.deezer.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <GrInternetExplorer
                                        size={36}
                                        color={'#000'}
                                    />
                                    <span>WebSite</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                ) : isFaqsInfo ? (
                    <QuestionList />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Details;
