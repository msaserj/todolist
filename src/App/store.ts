import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { todolistReducer } from "../features/TodolistsList/todolist-reducer";
import { taskReducer } from "../features/TodolistsList/task-reducer";
import { ThunkAction } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Auth/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import {useAppDispatch} from "./hooks";
import {useMemo} from "react";
import {FieldErrorType} from "../api/todolists-api";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния // слайсы
const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
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

export type AppDispatchType = typeof store.dispatch

export type ThunkErrorType = {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()
  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  },[])
  return boundActions
}
