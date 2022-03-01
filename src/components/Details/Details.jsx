import React from "react";
import { useSelector } from "react-redux";
import QuestionList from "../Question/QuestionList";
import "./details.scss";


const Details = () => {
    const { isContactInfo, isFaqsInfo } = useSelector((state) => state.burgerSlice)

    return (
        <div className="details">
            <div className="details__wrapper">
                {isContactInfo ?
                    <ul className="details__list list">
                        <li className="list__item">
                            <span className="list__title">Developed by Fpsska</span>
                            <div className="list__social">
                                <img
                                    className="list__image"
                                    src="https://cdn-icons.flaticon.com/png/512/3670/premium/3670044.png?token=exp=1646082520~hmac=98a94708f0241c8ec4d073f6324be6a1"
                                    alt="icon"
                                />
                                <a
                                    className="list__link"
                                    href="https://t.me/Fpsska"
                                    target="_blank"
                                >
                                    Telegram
                                </a>
                            </div>
                            <div className="list__social">
                                <img
                                    className="list__image"
                                    src="https://cdn-icons-png.flaticon.com/512/6244/6244710.png"
                                    alt="icon"
                                />
                                <a
                                    className="list__link"
                                    href="mailto:fpsska1337@gmail.com"
                                    target="_blank"
                                >
                                    Mail
                                </a>
                            </div>
                        </li>
                        <li className="list__item">
                            <span className="list__title">Designed by Om Arya</span>
                            <div className="list__social">
                                <img
                                    className="list__image"
                                    src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                                    alt="icon"
                                />
                                <a
                                    className="list__link"
                                    href="https://omarya.in/c06bb8267814418890050935c1319f52"
                                    target="_blank"
                                >
                                    WebSite
                                </a>
                            </div>
                            <div className="list__social">
                                <img
                                    className="list__image"
                                    src="https://cdn-icons-png.flaticon.com/512/6244/6244710.png"
                                    alt="icon"
                                />
                                <a
                                    className="list__link"
                                    href="mailto:omkumar9031@gmail.com"
                                    target="_blank"
                                >
                                    Mail
                                </a>
                            </div>
                            <div className="list__social">
                                <img
                                    className="list__image"
                                    src="https://cdn-icons.flaticon.com/png/512/4401/premium/4401407.png?token=exp=1646084251~hmac=2b0421236cf99e644452e74e7fa24140"
                                    alt="icon"
                                />
                                <a
                                    className="list__link"
                                    href="https://www.instagram.com/uiux.om"
                                    target="_blank"
                                >
                                    Instagram
                                </a>
                            </div>
                        </li>
                        <li className="list__item">
                            <span className="list__title">Povered by Deezer API</span>
                            <div className="list__social">
                                <img
                                    className="list__image"
                                    src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                                    alt="icon"
                                />
                                <a
                                    className="list__link"
                                    href="https://developers.deezer.com/"
                                    target="_blank"
                                >
                                    WebSite
                                </a>
                            </div>
                        </li>
                    </ul>
                    :
                    isFaqsInfo ? <QuestionList /> : <></>
                }
            </div>
        </div>
    );
};

export default Details;
