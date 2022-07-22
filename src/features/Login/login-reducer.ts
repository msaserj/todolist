import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../App/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";

// ActionCreators
export const loginAC = (params: LoginParamsType) => {
    return {type: 'LOGIN', params} as const
}

// reducers
const initialState = {}
export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN':
            return state
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


// types
export type LoginActionType = ReturnType<typeof loginAC>

type InitialStateType = any

type ThunkDispatchType = Dispatch<LoginActionType | SetErrorActionType | SetStatusActionType>

