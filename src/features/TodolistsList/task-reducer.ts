import {TaskType, todolistsAPI, UpdateTaskModelType,} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {setAppStatusAC} from "../../App/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {AppRootStateType} from "../../App/store";
import {asyncActions as asyncTodolistsActions} from "./todolist-reducer";

// sanki

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
    return {tasks, todolistId}

})
export const removeTask = createAsyncThunk('tasks/removeTask',
    async (param: { todolistId: string, taskId: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {todolistId: param.todolistId, taskId: param.taskId}
})
export const addTask = createAsyncThunk('tasks/addTask',
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
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
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (err: any) {
            handleNetworkAppError(err, dispatch);
            return rejectWithValue(null);
        }

    })

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}

// reducers
const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodolistsActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(asyncTodolistsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(asyncTodolistsActions.fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {state[tl.id] = [];});
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index > -1) {tasks.splice(index, 1);}
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].push(action.payload);
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel};
            }
        });
        builder.addCase(clearState, () => {
            return {}
        })
    },
});

export const taskReducer = slice.reducer;

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