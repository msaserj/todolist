import {TodolistsType} from "../App";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'XXX':

            return state

        default:
            throw new Error('I don\'t understand this type')
    }
}