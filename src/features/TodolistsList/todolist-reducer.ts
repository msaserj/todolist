import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../App/store";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {handleNetworkAppError} from "../../utils/error-utils";

// ActionCreators
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todolistId} as const}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todolistId} as const}
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, status} as const}


// from backend
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const}

// reducers
const initialState: Array<TodolistDomainType> = []
export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return  state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return  state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus:'idle'}))
        default:
            return state
        //throw new Error('I don\'t understand this type')
    }
}

//sanki
export const fetchTodolistsTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err) => {
            handleNetworkAppError(err, dispatch);
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistsAPI.deleteTodolists(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err) => {
            handleNetworkAppError(err, dispatch);
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolists(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err) => {
            handleNetworkAppError(err, dispatch);
        })
}

// types
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>


export type TodolistActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>



