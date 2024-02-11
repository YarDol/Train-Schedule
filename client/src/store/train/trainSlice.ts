import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITrainData } from "../../types/types";

interface TrainState {
    trains: ITrainData[];
    loading: boolean;
    error: string | null;
}

const initialState: TrainState = {
    trains: [],
    loading: false,
    error: null
}

export const trainSlice = createSlice({
    name: 'train',
    initialState,
    reducers: {
        getTrains: (state) => {
            state.loading = true;
        },
        getTrainsSuccess: (state, action: PayloadAction<ITrainData[]>) => {
            state.trains = action.payload;
            state.loading = false;
        },
        getTrainsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        createTrain: (state, action: PayloadAction<ITrainData>) => {
            state.trains.push(action.payload);
        },
        deleteTrain: (state, action: PayloadAction<number>) => {
            state.trains = state.trains.filter((train: ITrainData) => train.id !== action.payload);
        },
        updateTrain: (state, action: PayloadAction<ITrainData>) => {
            state.trains = state.trains.map((train: ITrainData) => train.id === action.payload.id ? action.payload : train);
        }
    }
})

export const { getTrains, getTrainsSuccess, getTrainsError, createTrain, updateTrain } = trainSlice.actions;

export const selectTrains = (state: { train: TrainState }) => state.train.trains;

export default trainSlice.reducer;