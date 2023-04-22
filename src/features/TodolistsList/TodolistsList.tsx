import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../App/hooks";
import { TodolistDomainType } from "./todolist-reducer";
import {TasksStateType,} from "./task-reducer";
import { Grid } from "@mui/material";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
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

  const dispatch = useAppDispatch()

  const {fetchTodolists} = useActions(todoListsActions)

  const addTodoListCB = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {


      let thunk = todoListsActions.addTodoList( title);
      const resultAction = await dispatch(thunk);
      if (todoListsActions.addTodoList.rejected.match(resultAction)) {
          if (resultAction.payload?.errors?.length) {
              const error = resultAction.payload?.errors[0]
              helper.setError(error)
              throw new Error(error)
          } else {
              helper.setError("Some error occurred")
          }
      } else {
          helper.setTitle('')
      }

      }, []);


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
        <AddItemForm addItem={addTodoListCB} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tdl) => {
          let tasksForTodoList = tasks[tdl.id]; // храним отфильтрованные таски. по умолчанию all

          return (
            <Grid item xs={12} md={6} xl={4}>
              <div style={{ opacity: "80%", width: '300px' }}>
                <Todolist
                  todolist={tdl}
                  key={tdl.id}
                  tasks={tasksForTodoList}
                  demo={demo}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
