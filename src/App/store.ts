import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TodolistActionsType, todolistReducer} from "../features/TodolistsList/todolist-reducer";
import {TaskActionsType, taskReducer} from "../features/TodolistsList/task-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния // слайсы
const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    login: authReducer
})

// определить автоматически тип всего объекта состояния
// export const store = createStore(rootRedcer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootRedcer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
type AppActionsType = TaskActionsType | TodolistActionsType

// @ts-ignore
window.store = store
