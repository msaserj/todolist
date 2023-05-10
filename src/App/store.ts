import { combineReducers } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { taskReducer, todolistReducer } from "../features/TodolistsList";
import { appReducer } from "../features/App";
import { authReducer } from "../features/Auth";
import { configureStore } from "@reduxjs/toolkit";
import { RootReducerType, RootState } from "../utils/types";

export const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;
export type AppRootStateType = ReturnType<RootReducerType>;

