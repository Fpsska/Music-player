import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports

export const fetchAlbumsData = createAsyncThunk(
    'mainSlice/fetchAlbumData',
    async (_, { rejectWithValue }) => {
        try {
            const URL =
                'https://music-player-backend-ps8zm5180-fpsska.vercel.app/api/data';
            const response = await fetch(URL);

            if (!response.ok) {
                console.error('Error: response error');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            console.error(err || err.message);
            return rejectWithValue(err.message); // send to case rejected.type of extreReducers
        }
    }
);
