import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { switchDrowDownStatus } from "../../app/burgerSlice";
import SvgTemplate from "../Common/SvgTemplate";
import "./question.scss";

const Question = ({ id, question, answer, isDropDownHidden }) => {
    const dispatch = useDispatch();

    const handleDropDown = () => {
        // isDropDownHidden
        //     ? dispatch(switchDrowDownStatus({ id: id, status: false }))
        //     : dispatch(switchDrowDownStatus({ id: id, status: true }));
        dispatch(switchDrowDownStatus(!isDropDownHidden))
    };

    useEffect(() => {
        console.log(isDropDownHidden)
    }, [isDropDownHidden])

    return (
        <div className="question__item" key={id} onClick={handleDropDown}>
            <div className="question__header">
                <h4 className="question__title">
                    {question}
                </h4>
                <button className="question__button">
                    <SvgTemplate id="arrow_dropdown" />
                </button>
            </div>
            {/* {isDropDownHidden ? <></> : <p className="question__answer">{answer}</p>} */}
            <p className="question__answer">{answer}</p>
        </div>
    );
};

export default Question;
