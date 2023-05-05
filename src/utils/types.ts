import { rootReducer, store } from "../App/store";
import { FieldErrorType } from "../api/types";

export type RootReducerType = typeof rootReducer;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<RootReducerType>;

export type ThunkErrorType = {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> };
};
