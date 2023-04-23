import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../features/App/app-reducer";


export const clearState = createAction('common/clear-todos-tasks')


export const setAppStatus = createAction<{status: RequestStatusType}>('app/setStatus')
export const setAppError = createAction<{error: string | null}>('app/setError')

export const appActions = {
    setAppStatus,
    setAppError
}

