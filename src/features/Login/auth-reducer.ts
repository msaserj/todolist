import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../App/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";

// ActionCreators
export const setIsLoggedInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

// reducers
const initialState: InitialStateType = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
        //throw new Error('I don\'t understand this type')
    }
}

// sanki
export const loginTC = (params: LoginParamsType) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(params)
        .then((res) => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
                alert("login!")
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((err) => {
            handleNetworkAppError(err, dispatch);
        })
}
export const logOutTC = () => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then((res) => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((err) => {
            handleNetworkAppError(err, dispatch);
        })
}


// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatchType = Dispatch<LoginActionsType | SetErrorActionType | SetStatusActionType>

