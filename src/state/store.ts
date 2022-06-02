import {combineReducers} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

import {legacy_createStore as createStore} from 'redux'



const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

// type AppRootState = {
//     todolists: Array<TodolistsType>
//     tasks: TasksStateType
// }

type AppRootState = ReturnType<typeof rootRedcer>

export const store = createStore(rootRedcer);


// @ts-ignore
window.store = store