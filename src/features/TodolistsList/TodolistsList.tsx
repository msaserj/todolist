import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  addTodolistTC,
  changeTodolistFilterAC, changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType,
} from "./todolist-reducer";
import {
  addTaskTC,
  removeTaskTC,
  TasksStateType,
  updateTaskTC,
} from "./task-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();
  // выбираем из redux при помощи useSelect таски и тудулисты
  // это вместо локального стейта useState
  const todolists = useAppSelector<Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
  const isLoggedIn = useAppSelector<boolean>((state) => state.login.isLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, [dispatch]);

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTaskTC({todolistId, taskId}));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(addTaskTC({todolistId, title}));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC({todolistId: todolistId, taskId: taskId, domainModel: {status}}));
    },
    [dispatch]
  );
  const changeTaskTitle = useCallback(
    (todolistId: string, id: string, title: string) => {
      dispatch(updateTaskTC({todolistId, taskId: id, domainModel: { title }}));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todolistId: string, filter: FilterValueType) => {
      dispatch(changeTodolistFilterAC({ todolistId, filter }));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch]
  );
  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC({todolistId, title}));
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid style={{ padding: "20px" }} container>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tdl) => {
          let tasksForTodoList = tasks[tdl.id]; // храним отфильтрованные таски. по умолчанию all

          return (
            <Grid item xs={12} md={6} xl={4}>
              <Paper style={{ padding: "10px", opacity: "80%" }} elevation={3}>
                <Todolist
                  todolist={tdl}
                  key={tdl.id}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
