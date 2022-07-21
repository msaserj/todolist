//app-reducer.tsx


export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}

export const initialState: InitialStateType = {
    status: 'idle',
    error: null
}
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string| null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;

type ActionsType =  SetErrorActionType | SetStatusActionType
