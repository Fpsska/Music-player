import React from 'react';
import { useRef } from 'react';

import { RiArrowDropDownLine } from 'react-icons/ri';

import { useAppDispatch } from '../../app/hooks';

import { switchDropDownStatus } from '../../app/slices/burgerSlice';

// /. imports

interface QuestionPropTypes {
  id: string;
  question: string;
  answer: string;
  isDropDownHidden: boolean;
}

// /. interfaces

const Question: React.FC<QuestionPropTypes> = (props: QuestionPropTypes) => {

  const {
    id,
    question,
    answer,
    isDropDownHidden
  } = props;

  const dispatch = useAppDispatch();
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
            isDropDownHidden ? 'question__button' : 'question__button opened'
          }
          ref={icon}
        >
          <RiArrowDropDownLine size={24} color={'#eaf0ff'} />
        </button>
      </div>
      {isDropDownHidden ? <></> : <p className="question__answer">{answer}</p>}
    </div>
  );
};

export default Question;
