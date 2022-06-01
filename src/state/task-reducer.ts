import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTaskActionType
| AddTaskActionType


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskID}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title}
}

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
         case 'ADD-TASK': {
             const stateCopy = {...state}
             const tasks = stateCopy[action.todolistId]
             const newTask = {id: v1(), title: action.title, isDone: false}
             const newTasks = [newTask, ...tasks]
             stateCopy[action.todolistId] = newTasks
             return stateCopy
         }
        default:
            throw new Error('I don\'t understand this type')
    }
}
