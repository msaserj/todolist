import {TasksStateType} from "../AppWithRedux";
import {
    AddTodolistActionType, changeTodolistTitleAC,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolist-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppThunk, RootState} from "./store";
import {Dispatch} from "redux";

export type TaskActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
| SetTasksActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskID: string
    todolistId: string
    model: UpdateDomainTaskModelType
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todolistId: string
    title: string
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todolistId: todolistId, taskID: taskId, model}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title: title, todolistId: todolistId, taskID: taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks: tasks, todolistId: todolistId}
}


// from backend
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


// const initialState = {
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ]
// }
const initialState = {}


export const taskReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'UPDATE-TASK': {

            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskID
                ? {...t, title: action.title}
                : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state
        //throw new Error('I don\'t understand this type')
    }
}

//sanki



export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
    .then((res)=> {
        dispatch(removeTaskAC(todolistId, taskId))
    })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
    .then(res => {
        dispatch(addTaskAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
    .then(res => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch: Dispatch, getState: ()=> RootState) => {
    const  state = getState();
    const task = state.tasks[todolistId].find(t => t.id ===taskId);
    if(!task){
        console.warn("task not found")
        return
    }
    const apiModel: UpdateTaskModelType = {
        status: task.status,
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
    .then(res => {
        dispatch(updateTaskAC(todolistId, taskId, domainModel))
    })
}

