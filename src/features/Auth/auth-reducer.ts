import {setAppStatusAC} from "../../App/app-reducer";

import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {
    handleServerNetworkError,
    handleServerAppError, handleAsyncServerNetworkError, handleAsyncServerAppError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {ThunkErrorType} from "../../App/store";

// sanki

const loginTC = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>('auth/login', async (param: LoginParamsType, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await authAPI.auth(param)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}));
            return;
        } else {
            return handleAsyncServerAppError(res.data, dispatch, rejectWithValue)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, dispatch, rejectWithValue, false)
    }
})

const logOutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    const res = await authAPI.logOut()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(clearState());
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({});
        }
    } catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({});
    }
})

export const asyncActions = {
    loginTC,
    logOutTC
}


// reducers
export const slice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logOutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
});

export const authReducer = slice.reducer;
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;


