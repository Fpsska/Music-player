import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { switchSearchPageStatus } from "../../app/slices/mainSlice";
import { switchInformationStatus, switchContactInfoStatus, switchBurgerStatus, switchFaqsInfoStatus } from "../../app/slices/burgerSlice";
import SvgTemplate from "../Common/SvgTemplate";
import Details from "../Details/Details";
import { RootState } from "../../app/store";

const BurgerNav: React.FC = () => {
    const { isLightTheme, isInformationVisible, isContactInfo, isFaqsInfo } = useSelector((state: RootState) => state.burgerSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 
    const displaySocial = (): void => {
        if (isContactInfo) {
            dispatch(switchInformationStatus(false));
            dispatch(switchContactInfoStatus(false));
            dispatch(switchFaqsInfoStatus(true));
        } else {
            dispatch(switchInformationStatus(true));
            dispatch(switchContactInfoStatus(true));
            dispatch(switchFaqsInfoStatus(false));
        }

    };
    const displayFAQs = (): void => {
        if (isFaqsInfo) {
            dispatch(switchInformationStatus(false));
            dispatch(switchFaqsInfoStatus(false));
            dispatch(switchContactInfoStatus(true));
        } else {
            dispatch(switchInformationStatus(true));
            dispatch(switchFaqsInfoStatus(true));
            dispatch(switchContactInfoStatus(false));
        }
    };

    const relocateToSearchPage = (): void => {
        setTimeout(() => {
            navigate("search");
            dispatch(switchBurgerStatus(false))
            dispatch(switchSearchPageStatus(true))
        }, 200);
    }
    // 
    return (
        <nav className="burger__menu">
            <ul
                className={`menu ${isLightTheme ? "light" : ""} ${isInformationVisible ? "opened" : ""}`
                }
            >
                <li className="menu__item">
                    <SvgTemplate id="profile" />
                    <a
                        className="menu__link"
                        href="https://github.com/Fpsska"
                        target="_blank"
                    >
                        Profile
                    </a>
                </li>
                <li className="menu__item">
                    <SvgTemplate id="like" />
                    <span className="menu__link" onClick={relocateToSearchPage}>
                        Liked Songs
                    </span>
                </li>
                <li className="menu__item">
                    <SvgTemplate id="language" />
                    <span className="menu__link">Language</span>
                </li>
                <li className="menu__item" onClick={displaySocial}>
                    <SvgTemplate id="message" />
                    <span className="menu__link">Contact us</span>
                </li>
                <li className="menu__item" onClick={displayFAQs}>
                    <SvgTemplate id="faqs" />
                    <span className="menu__link">FAQs</span>
                </li>
                <li className="menu__item">
                    <SvgTemplate id="main-settings" />
                    <span className="menu__link">Settings</span>
                </li>
            </ul>
            {isInformationVisible ? <Details /> : <></>}
        </nav>
    )
}

export default BurgerNav;