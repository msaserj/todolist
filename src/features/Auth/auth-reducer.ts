import {handleAsyncServerNetworkError, handleAsyncServerAppError } from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clearState, setAppStatus, setIsLoggedIn} from "../../common/actions/common.actions";
import {ThunkErrorType} from "../../utils/types";
import {LoginParamsType} from "../../api/types";
import {authAPI} from "../../api/todolists-api";

// sanki
const login = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>('auth/login', async (param: LoginParamsType, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await authAPI.auth(param)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}));
            return;
        } else {
            return handleAsyncServerAppError(res.data, dispatch, rejectWithValue)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, dispatch, rejectWithValue, false)
    }
})

const logOut = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: "loading"}));
    const res = await authAPI.logOut()
    try {
        if (res.data.resultCode === 0) {
            dispatch(clearState());
            dispatch(setAppStatus({status: "succeeded"}));
        } else {
            return handleAsyncServerAppError(res.data, dispatch, rejectWithValue);
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, dispatch, rejectWithValue);
    }
})

export const asyncActions = {login, logOut}

// reducers
export const slice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        .addCase(logOut.fulfilled, (state) => {
            state.isLoggedIn = false
        })
            .addCase(setIsLoggedIn, (state, action) => {
                state.isLoggedIn = action.payload.value;
            })
    }
});



