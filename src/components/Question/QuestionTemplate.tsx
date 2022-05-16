import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { switchDropDownStatus } from "../../app/burgerSlice";
import SvgTemplate from "../Common/SvgTemplate";


interface QuestionPropTypes {
  id: string;
  question: string;
  answer: string;
  isDropDownHidden: boolean;
}

const Question: React.FC<QuestionPropTypes> = (props: QuestionPropTypes) => {

  const {
    id,
    question,
    answer,
    isDropDownHidden,
  } = props;

  const dispatch = useDispatch();
  const icon = useRef<HTMLButtonElement>(null);

  const handleDropDown = (): void => {
    dispatch(switchDropDownStatus({ id, status: !isDropDownHidden }));
  };

  return (
    <div className="question__item" key={id}>
      <div className="question__header">
        <h4 className="question__title">{question}</h4>
        <button
          onClick={handleDropDown}
          className={
            isDropDownHidden ? "question__button" : "question__button opened"
          }
          ref={icon}
        >
          <SvgTemplate id="arrow_dropdown" />
        </button>
      </div>
      {isDropDownHidden ? <></> : <p className="question__answer">{answer}</p>}
    </div>
  );
};

export default Question;
