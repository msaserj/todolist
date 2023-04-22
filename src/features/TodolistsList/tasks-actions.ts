import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../App/app-reducer";
import {todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {AppRootStateType} from "../../App/store";
import {UpdateDomainTaskModelType} from "./task-reducer";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
    return {tasks, todolistId}

})
export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {todolistId: param.todolistId, taskId: param.taskId}
})
export const addTask = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, {
    dispatch, rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    const res = await todolistsAPI.createTask(param.todolistId, param.title)
    try {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: "succeeded"}));
            return task
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({})
        }
    } catch (err: any) {
        handleNetworkAppError(err, dispatch);
        return rejectWithValue({})
    }
})
export const updateTask = createAsyncThunk('task/updateTask',
    async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {
        dispatch,
        getState,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType;
        const task = state.tasks[param.todolistId].find((t) => t.id === param.taskId);
        if (!task) {
            return rejectWithValue('task not found');
        }
        const apiModel: UpdateTaskModelType = {
            status: task.status,
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.domainModel,
        };
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        try {
            if (res.data.resultCode === 0) {
                return param
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (err: any) {
            handleNetworkAppError(err, dispatch);
            return rejectWithValue(null);
        }

    })