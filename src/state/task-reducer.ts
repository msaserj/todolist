import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

type ActionsType = RemoveTaskActionType
| AddTaskActionType
| ChangeTaskStatusActionType
| ChangeTaskTitleActionType
| AddTodolistActionType
| RemoveTodolistActionType

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
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistId: string
    status: TaskStatuses
}
type ChangeTaskTitleActionType = {
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId: todolistId, taskID: taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title: title, todolistId: todolistId, taskID: taskId}
}

// const initialState = {
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ]
// }
const initialState = {}


export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
         case 'ADD-TASK': {
             const stateCopy = {...state}
             const tasks = stateCopy[action.todolistId]
             const newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.Completed, todoListId: action.todolistId, description: '',
                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}

             stateCopy[action.todolistId] = [newTask, ...tasks]
             return stateCopy
         }
        case 'CHANGE-TASK-STATUS': {

            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.taskID ? {...t, status: action.status} :t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskID
                ? {...t, title: action.title}
                :t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
            //throw new Error('I don\'t understand this type')
    }
}


