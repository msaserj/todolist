import axios from "axios";
import {LoginParamsType, TasksResponse, TaskType, TodolistType, UpdateTaskModelType, ResponseType} from "./types";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "43312b93-73fd-4342-90f4-f7fe2aad1adb",
  },
};
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

// endPints api
export const todolistsAPI = {
  // Todolist Endpoints
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists");
  },
  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title: title,
    });
  },
  deleteTodolists(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title });
  },

  // TASK Endpoints
  getTasks(todolistId: string) {
    return instance.get<TasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title: title }
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<UpdateTaskModelType>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
};

export const authAPI = {
  // auth Endpoints
  auth(params: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>(
      "auth/login",
      params
    );
  },
  me() {
    return instance.get<
      ResponseType<{ id: number; email: string; login: string }>
    >("auth/me");
  },
  logOut() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
};

