import {TasksStateType} from "../AppWithRedux";
import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    const action = addTodolistAC({
        id: "any",
        order: 0,
        addedData: "",
        title: "new title"
    })

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})