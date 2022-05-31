import {TodolistsType} from "../App";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.id)

        default:
            throw new Error('I don\'t understand this type')
    }
}