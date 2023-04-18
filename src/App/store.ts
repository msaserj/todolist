import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { todolistReducer } from "../features/TodolistsList/todolist-reducer";
import { taskReducer } from "../features/TodolistsList/task-reducer";
import { ThunkAction } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния // слайсы
const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  login: authReducer,
});

// определить автоматически тип всего объекта состояния
// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type RootReducerType = typeof rootReducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

export type AppRootStateType = ReturnType<RootReducerType>;

// @ts-ignore
window.store = store;
