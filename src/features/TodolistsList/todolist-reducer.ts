import {TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../../App/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearState} from "../../common/actions/common.actions";
import {addTodoList, changeTodolistTitle, fetchTodolists, removeTodolist} from "./todolists-actions";


//sanki


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
