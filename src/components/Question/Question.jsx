import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { switchDropDownStatus } from "../../app/burgerSlice";
import SvgTemplate from "../Common/SvgTemplate";
import "./question.scss";

const Question = ({ id, question, answer, isDropDownHidden }) => {
    const dispatch = useDispatch();
    const icon = useRef()

    const handleDropDown = () => {
        dispatch(switchDropDownStatus({ id, status: !isDropDownHidden }))
    };

    return (
        <div className="question__item" key={id} onClick={handleDropDown}>
            <div className="question__header">
                <h4 className="question__title">
                    {question}
                </h4>
                <button className={isDropDownHidden ? "question__button" : "question__button opened"} ref={icon}>
                    <SvgTemplate id="arrow_dropdown" />
                </button>
            </div>
            {isDropDownHidden ? <></> : <p className="question__answer">{answer}</p>}
        </div>
    );
};

export default Question;
