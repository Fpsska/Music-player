import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { handleObjProperties } from 'helpers/handleObjProperties';
// /. imports

interface mainSliceState {
    pagesStatuses: { [key: string]: boolean };
    isLoading: boolean;
}

// /. interfaces

const initialState: mainSliceState = {
    pagesStatuses: {
        isHomePage: true,
        isPlayerPage: false,
        isPlaylistPage: false,
        isSearchPage: false
    },
    isLoading: true
};

// /. initialState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        switchPageStatus(state, action: PayloadAction<{ locationData: any }>) {
            const { locationData } = action.payload;
            // /. payload

            const pathName = locationData.pathname.toLowerCase();

            switch (pathName) {
                case '/music-player':
                    state.pagesStatuses = handleObjProperties(
                        'isHomePage',
                        state.pagesStatuses
                    );
                    break;
                case '/music-player/player':
                    state.pagesStatuses = handleObjProperties(
                        'isPlayerPage',
                        state.pagesStatuses
                    );
                    break;
                case '/music-player/playlist':
                    state.pagesStatuses = handleObjProperties(
                        'isPlaylistPage',
                        state.pagesStatuses
                    );
                    break;
                case '/music-player/search':
                    state.pagesStatuses = handleObjProperties(
                        'isSearchPage',
                        state.pagesStatuses
                    );
                    break;
                default:
                    return;
            }
        },
        switchLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        }
    }
});

export const { switchPageStatus, switchLoadingStatus } = mainSlice.actions;

export default mainSlice.reducer;
