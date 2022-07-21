import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <Data>(data: ResponseType<Data>, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleNetworkAppError = (err: { message: string }, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppErrorAC(err.message ? err.message : "Some error occurred"))
    dispatch(setAppStatusAC('failed'))
}
