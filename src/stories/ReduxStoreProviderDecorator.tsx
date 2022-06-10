import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import React from "react";
import {combineReducers} from "redux";
import {todolistReducer} from "../state/todolist-reducer";
import {taskReducer} from "../state/task-reducer";
import { legacy_createStore as createStore} from 'redux'

const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistID1", title: 'What to learn', filter: 'all'},
        {id: "todolistID2", title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        "todolistID1": [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
        ],
        "todolistID2": [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
        ]
    }
}

export const storyBookStore = createStore(rootRedcer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}