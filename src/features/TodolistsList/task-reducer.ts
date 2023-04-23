import { todolistsAPI} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clearState, setAppStatus} from "../../common/actions/common.actions";
import {handleAsyncServerNetworkError, handleAsyncServerAppError} from "../../utils/error-utils";
import {AppRootStateType} from "../../App/store";
import {todoListsActions} from "./";
import {ThunkErrorType} from "../../utils/types";
import {TaskType, UpdateTaskModelType} from "../../api/types";


// sanki

export const fetchTasks = createAsyncThunk<{tasks: TaskType[], todolistId: string}, string, ThunkErrorType>('tasks/fetchTasks',
    async (todolistId, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(setAppStatus({status: "succeeded"}));
        return {tasks, todolistId}
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, dispatch, rejectWithValue)
    }


})
export const removeTask = createAsyncThunk<{todolistId: string, taskId: string}, { todolistId: string, taskId: string }, ThunkErrorType>('tasks/removeTask',
    async (param) => {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {todolistId: param.todolistId, taskId: param.taskId}
})
export const addTask = createAsyncThunk<TaskType, { todolistId: string, title: string }, ThunkErrorType>('tasks/addTask',
    async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatus({status: "succeeded"}));
            return task
        } else {
            return handleAsyncServerAppError(res.data, dispatch, rejectWithValue, false)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, dispatch, rejectWithValue)
    }
})
export const updateTask = createAsyncThunk('task/updateTask',
    async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType },
           {dispatch, getState, rejectWithValue}) => {
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
                return handleAsyncServerAppError(res.data, dispatch, rejectWithValue);
            }
        } catch (err: any) {
            return handleAsyncServerNetworkError(err, dispatch, rejectWithValue);
        }

    })

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}

// reducers
export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todoListsActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        .addCase(todoListsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        })
        .addCase(todoListsActions.fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {state[tl.id] = [];});
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        })
        .addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index > -1) {tasks.splice(index, 1);}
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].push(action.payload);
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel};
            }
        })
        .addCase(clearState, () => {
            return {}
        })
    },
});


// types

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: number;
    priority?: number;
    startDate?: string;
    deadline?: string;
};