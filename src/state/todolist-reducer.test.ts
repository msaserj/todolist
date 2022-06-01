import { v1 } from 'uuid'
import {FilterValueType, TodolistsType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistsType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = ChangeTodolistTitleAC(newTodolistTitle, todolistId2)
    const endState = todolistReducer(startState, action)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType= 'completed'

    const action = ChangeTodolistFilterAC(newFilter, todolistId2)
    const endState = todolistReducer(startState, action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})