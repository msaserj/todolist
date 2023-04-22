import { setAppErrorAC, setAppStatusAC } from "../App/app-reducer";
import { Dispatch } from "redux";
import { ResponseType } from "../api/todolists-api";
import {AxiosError} from "axios";

export const handleServerAppError = <Data>(
  data: ResponseType<Data>,
  dispatch: Dispatch,
  showError = true
) => {
  if (showError) {
    dispatch(setAppErrorAC({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
};

export const handleAsyncServerAppError = <Data>(
    data: ResponseType<Data>,
    dispatch: Dispatch,
    rejectWithValue: Function,
    showError = true
) => {
  if (showError) {
    dispatch(setAppErrorAC({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
  rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors});
};


export const handleServerNetworkError = (
  error: AxiosError,
  dispatch: Dispatch,
  showError = true
) => {
  if (showError) {
    dispatch(setAppErrorAC({error: error.message ? error.message : "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
};

export const handleAsyncServerNetworkError = (
    error: AxiosError,
    dispatch: Dispatch,
    rejectWithValue: Function,
    showError = true
) => {
  if (showError) {
    dispatch(setAppErrorAC({error: error.message ? error.message : "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
  return  rejectWithValue({errors: [error.message], fieldsErrors: undefined});
};