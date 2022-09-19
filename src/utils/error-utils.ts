import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <Data>(data: ResponseType<Data>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}
export const handleNetworkAppError = (err: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(err.message ? {error: err.message} : {error: "Some error occurred"}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
