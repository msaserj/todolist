//app-reducer.tsx

import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";


export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
    isInitialized: boolean
}

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    // true if app initialized (users and settings)
    isInitialized: false
}
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'


export const appReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string| null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//export const addTodolistTC = (title: string): AppThunk => (dispatch: ThunkDispatchType)

export const initializaAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then( res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        } else {
        }
        dispatch(setAppInitializedAC(true))
    })
}

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;

type AuthActionsType =  SetErrorActionType | SetStatusActionType | SetAppInitializedActionType

