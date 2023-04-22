import { authAPI } from "../api/todolists-api";
import { setIsLoggedInAC } from "../features/Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


//sanki

const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
  const  res = await authAPI.me()
  if (res.data.resultCode === 0) {
    dispatch(setIsLoggedInAC({ value: true }));
  }
})

export const asyncActions = {
  initializeApp
}


// reducers
const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle",
    error: null,
    isInitialized: false,
  } as InitialStateType,
  reducers: {
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, (state) => {
      state.isInitialized = true;
    })
  }
});

export const appReducer = slice.reducer;

export const { setAppErrorAC, setAppStatusAC } =
  slice.actions;

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
