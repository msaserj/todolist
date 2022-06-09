import {combineReducers, createStore} from 'redux';
import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

// type AppRootState = {
//     todolists: Array<TodolistsType>
//     tasks: TasksStateType
// }

// определить автоматически тип всего объекта состояния
export type AppRootState = ReturnType<typeof rootRedcer>

export const store = createStore(rootRedcer);

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store