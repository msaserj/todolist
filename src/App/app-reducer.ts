//app-reducer.tsx

import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export const initialState: InitialStateType = {
  status: "idle",
  error: null,
  // true if app initialized (users and settings)
  isInitialized: false,
};

// reducers
const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatusAC: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) => {
      state.status = action.payload.status;
    },
    setAppInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isInitialized = action.payload.value;
    },
  },
});

export const appReducer = slice.reducer;

export const { setAppErrorAC, setAppInitializedAC, setAppStatusAC } =
  slice.actions;

//sanki
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }));
    }
    dispatch(setAppInitializedAC({ value: true }));
  });
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
