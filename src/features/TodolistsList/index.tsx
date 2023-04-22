import {asyncActions as tasksAsyncActions} from './task-reducer'
import {asyncActions as todoListsAsyncActions} from './todolist-reducer'
import {slice} from './todolist-reducer'
import {TodolistsList} from "./TodolistsList"

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    todoListsActions,
    TodolistsList
}