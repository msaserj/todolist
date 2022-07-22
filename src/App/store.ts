import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TodolistActionsType, todolistReducer} from "../features/TodolistsList/todolist-reducer";
import {TaskActionsType, taskReducer} from "../features/TodolistsList/task-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {LoginActionsType, authReducer} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    login: authReducer
})

// определить автоматически тип всего объекта состояния
export const store = createStore(rootRedcer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

type AppActionsType = TaskActionsType | TodolistActionsType | LoginActionsType



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store


// type AppRootState = {
//     todolists: Array<TodolistsType>
//     tasks: TasksStateType
// }