import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers} from "redux";
import {todolistReducer} from "../../features/TodolistsList/todolist-reducer";
import {taskReducer} from "../../features/TodolistsList/task-reducer";
import { legacy_createStore as createStore} from 'redux'
import {RootState} from "../../App/store";
import thunk from "redux-thunk";

const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

const initialGlobalState = {}

export const storyBookStore = createStore(rootRedcer, initialGlobalState as RootState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}