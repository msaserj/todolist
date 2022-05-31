import {TodolistsType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
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
        default:
            throw new Error('I don\'t understand this type')
    }
}
