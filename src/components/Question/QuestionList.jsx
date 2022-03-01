import React from "react";
import { useSelector } from "react-redux";
import Question from "./Question";
import "./question.scss"

const QuestionList = () => {
    const { questions } = useSelector((state) => state.burgerSlice)

    const list = questions.map(item => {
        return (
            <Question
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                isDropDownHidden={item.isDropDownHidden}
            />
        )
    })

    return (
        <div className="question">
            <div className="question__wrapper">
                {list}
            </div>
        </div>
    )
}

export default QuestionList;