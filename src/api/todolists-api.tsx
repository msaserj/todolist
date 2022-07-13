import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "e86e985a-13f2-4794-96ce-9f4a352bdaee"
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// endPints api
export const todolistsAPI = {
    // Todolist Endpoints
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },

    // TASK Endpoints
    getTasks(todolistId: string) {
        return instance.get<TasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<UpdateTaskModelType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedData: string
    order: number
}
type ResponseType<Data = {}> = {
    resultCode: number
    messages: Array<string>
    data: Data
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type TasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
