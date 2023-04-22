import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {handleNetworkAppError} from "../../utils/error-utils";


//sanki
const fetchTodolists = createAsyncThunk('todolists/fetchTodoLists',
    async (param, {dispatch, rejectWithValue}) => {
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
const removeTodolist = createAsyncThunk('todolists/removeTodoList',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
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
const addTodoList = createAsyncThunk('todolists/addTodoList',
    async (title: string, {dispatch, rejectWithValue}) => {
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
const changeTodolistTitle = createAsyncThunk('todolists/changeTodoListTitle',
    async (param: { todolistId: string, title: string }) => {
    await todolistsAPI.updateTodolist(param.todolistId, param.title)
    return {todolistId: param.todolistId, title: param.title}
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
