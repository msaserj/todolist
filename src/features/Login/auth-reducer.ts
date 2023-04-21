import {setAppStatusAC} from "../../App/app-reducer";

import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {
    handleNetworkAppError,
    handleServerAppError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {AxiosError} from "axios";


// reducers
const slice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = true
        });
        builder.addCase(logOutTC.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })
    }
});

export const authReducer = slice.reducer;
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// sanki

export const loginTC = createAsyncThunk<undefined, LoginParamsType, {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}>('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return  thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleNetworkAppError(error, thunkAPI.dispatch);
        return  thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
    }
})

export const logOutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
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
           handleNetworkAppError(err, thunkAPI.dispatch);
           return thunkAPI.rejectWithValue({});
       }
})
