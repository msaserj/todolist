import {TaskType,} from "../../api/todolists-api";
import {createSlice} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {addTask, fetchTasks, removeTask, updateTask} from "./tasks-actions";
import {addTodoList, fetchTodolists, removeTodolist} from "./todolists-actions";



const initialState: TasksStateType = {};

// reducers
const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = [];
            });
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
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