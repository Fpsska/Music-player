import React, { useRef } from 'react';

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
    const { id, question, answer, isDropDownHidden } = props;

    const dispatch = useAppDispatch();
    const refIcon = useRef<HTMLButtonElement>(null);

    // /. hooks

    const handleDropDown = (): void => {
        dispatch(switchDropDownStatus({ id, status: !isDropDownHidden }));
    };

    // /. functions

    return (
        <div
            className="question__item"
            key={id}
        >
            <div className="question__header">
                <h4 className="question__title">{question}</h4>
                <button
                    className={
                        isDropDownHidden
                            ? 'question__button'
                            : 'question__button opened'
                    }
                    ref={refIcon}
                    type="button"
                    aria-label={
                        isDropDownHidden
                            ? 'show answer content'
                            : 'hide answer content'
                    }
                    onClick={handleDropDown}
                >
                    <RiArrowDropDownLine
                        size={24}
                        color={'#eaf0ff'}
                    />
                </button>
            </div>
            {!isDropDownHidden && <p className="question__answer">{answer}</p>}
        </div>
    );
};

export default Question;
