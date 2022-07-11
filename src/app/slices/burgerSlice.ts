import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { questionsTypes } from '../../Types/burgerSliceTypes';

// /. imports

interface burgerSliceState {
  questions: questionsTypes[];
  isBurgerOpen: boolean;
  isCurtainVisible: boolean;
  isInformationVisible: boolean;
  isContactInfo: boolean;
  isFaqsInfo: boolean;
}

// /. interfaces

const initialState: burgerSliceState = {
  isBurgerOpen: false,
  isCurtainVisible: true,
  isInformationVisible: false,
  isContactInfo: false,
  isFaqsInfo: false,
  questions: [
    {
      id: '0',
      question: 'Which technologies used in this app?',
      answer:
        'This project was bootstrapped with Create React App, using the Redux and Redux Toolkit template.',
      isDropDownHidden: true
    },
    {
      id: '1',
      question: 'Where did you get all the information about the tracks from?',
      answer: 'We used free Deezer API for get data of all provided tracks.',
      isDropDownHidden: true
    }
  ]
};

// /. initialState

const burgerSlice = createSlice({
  name: 'burgerSlice',
  initialState,
  reducers: {
    switchBurgerStatus(state, action: PayloadAction<boolean>) {
      state.isBurgerOpen = action.payload;
    },
    switchCurtainStatus(state, action: PayloadAction<boolean>) {
      state.isCurtainVisible = action.payload;
    },
    switchInformationStatus(state, action: PayloadAction<boolean>) {
      state.isInformationVisible = action.payload;
    },
    switchContactInfoStatus(state, action: PayloadAction<boolean>) {
      state.isContactInfo = action.payload;
    },
    switchFaqsInfoStatus(state, action: PayloadAction<boolean>) {
      state.isFaqsInfo = action.payload;
    },
    switchDropDownStatus(state, action: PayloadAction<any>) {
      const { id, status } = action.payload;
      state.questions.map(item => item.id === id ? item.isDropDownHidden = status : item);
    }
  }
});

export const {
  switchBurgerStatus,
  switchCurtainStatus,
  switchInformationStatus,
  switchContactInfoStatus,
  switchFaqsInfoStatus,
  switchDropDownStatus
} = burgerSlice.actions;

export default burgerSlice.reducer;
