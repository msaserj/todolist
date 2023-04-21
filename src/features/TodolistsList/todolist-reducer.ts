import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {handleNetworkAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";


//sanki

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodoLists', async (param, {
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

export const removeTodolistTC = createAsyncThunk('todolists/removeTodoList', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC({todolistId, status: "loading"}));
    await todolistsAPI.deleteTodolists(todolistId)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}));
        return {todolistId};
    } catch (err: any) {
        handleNetworkAppError(err, dispatch);
        return rejectWithValue({})
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodoList', async (title: string, {
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


export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodoListTitle', async (param: { todolistId: string, title: string }) => {
    await todolistsAPI.updateTodolist(param.todolistId, param.title)
    return {todolistId: param.todolistId, title: param.title}
})


// reducers
const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilterAC(
            state,
            action: PayloadAction<{ todolistId: string; filter: FilterValueType }>
        ) {
            const index = state.findIndex(
                (tdl) => tdl.id === action.payload.todolistId
            );
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(
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
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle",}));
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(
                (tdl) => tdl.id === action.payload.todolistId
            );
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle",});
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex((tdl) => tdl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        })
    }
});

export const todolistReducer = slice.reducer;
// ActionCreators
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
} = slice.actions;


// types
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType;
    entityStatus: RequestStatusType;
};
