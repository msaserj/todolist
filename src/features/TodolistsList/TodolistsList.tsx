import React, { useEffect } from "react";
import { useAppSelector } from "../../App/hooks";
import { TodolistDomainType } from "./todolist-reducer";
import {TasksStateType,} from "./task-reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {useActions} from "../../App/store";
import {todoListsActions} from "./index";


type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {

  const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists);
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const {fetchTodolists, addTodoList} = useActions(todoListsActions)


  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);


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
