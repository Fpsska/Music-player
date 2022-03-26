import React from "react";
import { useSelector } from "react-redux";
import Question from "./QuestionTemplate";
import { RootState } from "../../app/store";
import "./question.scss";

const QuestionList: React.FC = () => {
  const { questions, isLightTheme } = useSelector(
    (state: RootState) => state.burgerSlice
  );

  const list = questions.map((item) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        answer={item.answer}
        isDropDownHidden={item.isDropDownHidden}
      />
    );
  });

  return (
    <div className={isLightTheme ? "question light" : "question"}>
      <div className="question__wrapper">{list}</div>
    </div>
  );
};

export default QuestionList;
