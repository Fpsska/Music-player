import React from 'react';
import { useSelector } from 'react-redux';

import QuestionList from '../Question/QuestionList';
import SvgTemplate from '../Common/SvgTemplate';
import { RootState } from '../../app/store';
import './details.scss';

// /. imports

const Details: React.FC = () => {
    const { isContactInfo, isFaqsInfo, isLightTheme } = useSelector(
        (state: RootState) => state.burgerSlice
    );
    // 
    return (
        <div className="details">
            <div className="details__wrapper">
                {isContactInfo ? (
                    <ul
                        className={
                            isLightTheme ? 'details__list list ligth' : 'details__list list'
                        }
                    >
                        <li className="list__item">
                            <span className="list__title">Developed by Fpsska</span>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://t.me/Fpsska"
                                    target="_blank" rel="noreferrer"
                                >
                                    <SvgTemplate id="telegram" />
                                    <span>Telegram</span>
                                </a>
                            </div>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="mailto:fpsska1337@gmail.com"
                                    target="_blank" rel="noreferrer"
                                >
                                    <SvgTemplate id="mail" />
                                    <span>Mail</span>
                                </a>
                            </div>
                        </li>
                        <li className="list__item">
                            <span className="list__title">Designed by Om Arya</span>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://omarya.in/c06bb8267814418890050935c1319f52"
                                    target="_blank" rel="noreferrer"
                                >
                                    <SvgTemplate id="website" />
                                    <span>WebSite</span>
                                </a>
                            </div>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="mailto:omkumar9031@gmail.com"
                                    target="_blank" rel="noreferrer"
                                >
                                    <SvgTemplate id="mail" />
                                    <span>Mail</span>
                                </a>
                            </div>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://www.instagram.com/uiux.om"
                                    target="_blank" rel="noreferrer"
                                >
                                    <SvgTemplate id="instagram" />
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </li>
                        <li className="list__item">
                            <span className="list__title">Povered by Deezer API</span>
                            <div className="list__social">
                                <a
                                    className="list__link"
                                    href="https://developers.deezer.com/"
                                    target="_blank" rel="noreferrer"
                                >
                                    <SvgTemplate id="website" />
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
