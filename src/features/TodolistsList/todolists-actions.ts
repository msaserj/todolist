import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../App/app-reducer";
import {todolistsAPI} from "../../api/todolists-api";
import {handleNetworkAppError} from "../../utils/error-utils";
import {changeTodolistEntityStatus} from "./todolist-reducer";

export const fetchTodolists = createAsyncThunk('todolists/fetchTodoLists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: "succeeded"}));
        return {todolists: res.data}
    } catch (err: any) {
        handleNetworkAppError(err, dispatch);
        return rejectWithValue({})
    }
})
export const removeTodolist = createAsyncThunk('todolists/removeTodoList', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}));
    await todolistsAPI.deleteTodolists(todolistId)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}));
        return {todolistId};
    } catch (err: any) {
        handleNetworkAppError(err, dispatch);
        return rejectWithValue({})
    }
})
export const addTodoList = createAsyncThunk('todolists/addTodoList', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    const res = await todolistsAPI.createTodolists(title)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}));
        return {todolist: res.data.data.item};
    } catch (err: any) {
        handleNetworkAppError(err, dispatch);
        return rejectWithValue({})
    }
})
export const changeTodolistTitle = createAsyncThunk('todolists/changeTodoListTitle', async (param: { todolistId: string, title: string }) => {
    await todolistsAPI.updateTodolist(param.todolistId, param.title)
    return {todolistId: param.todolistId, title: param.title}
})