import {authAPI} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError, setAppStatus, setIsLoggedIn} from "../../common/actions/common.actions";

//sanki
const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}));
    }
})

// reducers
export const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        // setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
        //   state.error = action.payload.error;
        // },
        // setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
        //   state.status = action.payload.status;
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true;
            })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error;
            })
    }
});


export const asyncActions = {initializeApp}

export type InitialStateType = {
    status: RequestStatusType;
    error: string | null;
    isInitialized: boolean;
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
