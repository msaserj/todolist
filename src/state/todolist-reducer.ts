import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodolistAtionType |
    AddTodolistAtionType |
    ChangeTodolistTitleAtionType |
    ChangeTodolistFilterAtionType

type RemoveTodolistAtionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistAtionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodolistTitleAtionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodolistFilterAtionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

export const todolistReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find(tdl => tdl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolist2 = state.find(tdl => tdl.id === action.id)
            if (todolist2) {
                todolist2.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('I don\'t understand this type')
    }
}
