import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTaskActionType


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskID}
}

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        default:
            throw new Error('I don\'t understand this type')
    }
}
