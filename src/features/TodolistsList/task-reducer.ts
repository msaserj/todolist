import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType, changeTodolistTitleAC, TodolistActionsType
} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {AppThunk, RootState} from "../../App/store";
import {Dispatch} from "redux";

// ActionCreators
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const}

// reducers
const initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model}: t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]:[]}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {stateCopy[tl.id] = []})
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
        //throw new Error('I don\'t understand this type')
    }
}

// sanki
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch: Dispatch<TaskActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch<TaskActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch<TaskActionsType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch: Dispatch<TaskActionsType>, getState: () => RootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
        console.warn("task not found")
        return
    }
    const apiModel: UpdateTaskModelType = {
        status: task.status,
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
        })
}

// types

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

