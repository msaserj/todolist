import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { ResponseType } from "../api/types";
import { setAppError, setAppStatus } from "../common/actions/common.actions";

export const handleAsyncServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
  rejectWithValue: Function,
  showError = true
) => {
  if (showError) {
    dispatch(
      setAppError({
        error: data.messages.length ? data.messages[0] : "Some error occurred",
      })
    );
  }
  dispatch(setAppStatus({ status: "failed" }));
  return rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors,
  });
};

export const handleAsyncServerNetworkError = (
  error: AxiosError,
  dispatch: Dispatch,
  rejectWithValue: Function,
  showError = true
) => {
  if (showError) {
    dispatch(
      setAppError({
        error: error.message ? error.message : "Some error occurred",
      })
    );
  }
  dispatch(setAppStatus({ status: "failed" }));

  return rejectWithValue({ errors: [error.message], fieldsErrors: undefined });
};
