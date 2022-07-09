import {Provider} from "react-redux";
import {AppRootState} from "../../state/store";
import React from "react";
import {combineReducers} from "redux";
import {todolistReducer} from "../../state/todolist-reducer";
import {taskReducer} from "../../state/task-reducer";
import { legacy_createStore as createStore} from 'redux'
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistID1", title: 'What to learn', filter: "all", addedData: '', order: 0},
        {id: "todolistID2", title: 'What to buy', filter: "all", addedData: '', order: 0},
    ],
    tasks: {
        "todolistID1": [
            {id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: "todolistID1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistID1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        "todolistID2": [
            {id: '1', title: 'bread', status: TaskStatuses.Completed, todoListId: "todolistID2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: "todolistID2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    }
}

export const storyBookStore = createStore(rootRedcer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}