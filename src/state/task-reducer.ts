import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTaskActionType
| AddTaskActionType
| changeTaskStatusActionType
| changeTaskTitleActionType

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
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistId: string
    isDone: boolean
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todolistId: string
    title: string
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskID}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone: isDone, todolistId: todolistId, taskID: taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title: title, todolistId: todolistId, taskID: taskId}
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
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}
