import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {
    handleServerNetworkError,
    handleServerAppError,
    handleAsyncServerNetworkError,
    handleAsyncServerAppError
} from "../../utils/error-utils";
import {ThunkErrorType} from "../../App/store";


//sanki
const fetchTodolists = createAsyncThunk('todolists/fetchTodoLists',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}));
        const res = await todolistsAPI.getTodolists()
        try {
            dispatch(setAppStatusAC({status: "succeeded"}));
            return {todolists: res.data}
        } catch (err: any) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue({})
        }
    })
const removeTodolist = createAsyncThunk('todolists/removeTodoList',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}));
        dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}));
        await todolistsAPI.deleteTodolists(todolistId)
        try {
            dispatch(setAppStatusAC({status: "succeeded"}));
            return {todolistId};
        } catch (err: any) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue({})
        }
    })
const addTodoList = createAsyncThunk<{ todolist: TodolistType }, string, ThunkErrorType>('todolists/addTodoList',
    async (title, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}));
        try {
            const res = await todolistsAPI.createTodolists(title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}));
                return {todolist: res.data.data.item};
            } else {
                return handleAsyncServerAppError(res.data, dispatch, rejectWithValue, false)
            }
        } catch (err: any) {
            return handleAsyncServerNetworkError(err, dispatch, rejectWithValue, false)
        }
    })
const changeTodolistTitle = createAsyncThunk('todolists/changeTodoListTitle',
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        try {
            const res = await todolistsAPI.updateTodolist(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}));
                return {todolistId: param.todolistId, title: param.title}
            } else {
                handleServerAppError(res.data, dispatch, false)
                return handleAsyncServerAppError(res.data, dispatch, rejectWithValue)
            }
        } catch (err: any) {
            return handleAsyncServerNetworkError(err, dispatch, rejectWithValue, false)
        }
    })

export const asyncActions = {
    fetchTodolists,
    removeTodolist,
    addTodoList,
    changeTodolistTitle
}

// reducers
export const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilter(
            state,
            action: PayloadAction<{ todolistId: string; filter: FilterValueType }>
        ) {
            const index = state.findIndex(
                (tdl) => tdl.id === action.payload.todolistId
            );
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatus(
            state,
            action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
        ) {
            const index = state.findIndex(
                (tdl) => tdl.id === action.payload.todolistId
            );
            state[index].entityStatus = action.payload.status;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(clearState, () => {
            return []
        })
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle",}));
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(
                (tdl) => tdl.id === action.payload.todolistId
            );
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle",});
        })
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex((tdl) => tdl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        })
    }
});

export const todolistReducer = slice.reducer;
// ActionCreators
export const {
    changeTodolistFilter,
    changeTodolistEntityStatus,
} = slice.actions;


// types
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType;
    entityStatus: RequestStatusType;
};
