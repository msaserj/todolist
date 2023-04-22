import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todolists-api";
import { TodolistDomainType } from "../todolist-reducer";
import { useAppDispatch } from "../../../App/hooks";
import {fetchTasks} from "../tasks-actions";
import {useActions} from "../../../App/store";
import {tasksActions, todoListsActions} from "../index";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: PropsType) => {
  const dispatch = useAppDispatch();

  const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = useActions(todoListsActions)
  const {addTask, updateTask, removeTask} = useActions(tasksActions)

  const addTaskCB = useCallback(
    (title: string) => {
      addTask({todolistId: props.todolist.id, title});
    },
    [props.todolist.title, props.todolist.id]
  );
  const removeTodolistHandler = () => {
    removeTodolist(props.todolist.id);
  };
  const changeTodolistTitleCB = useCallback(
    (title: string) => {
      changeTodolistTitle({todolistId: props.todolist.id, title});
    },
    [props.todolist.id]
  );

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    updateTask({todolistId: todolistId, taskId: taskId, domainModel: {status}});
  }, []);

  const changeTaskTitle = useCallback((todolistId: string, id: string, title: string) => {
    updateTask({todolistId, taskId: id, domainModel: { title }});
  }, []);

  const onAllClickHandler = useCallback(
    () => changeTodolistFilter({todolistId: props.todolist.id, filter: "all"}),
    [props.todolist.id]
  );
  const onActiveClickHandler = useCallback(
    () => changeTodolistFilter({todolistId: props.todolist.id, filter: "active"}),
    [props.todolist.id]
  );
  const onCompletedClickHandler = useCallback(
    () => changeTodolistFilter({todolistId: props.todolist.id, filter: "completed"}),
    [props.todolist.id]
  );

  let tasksForTodoList = props.tasks;
  if (props.todolist.filter === "active") {
    tasksForTodoList = props.tasks.filter(
      (task) => task.status === TaskStatuses.New
    );
  }
  if (props.todolist.filter === "completed") {
    tasksForTodoList = props.tasks.filter(
      (task) => task.status === TaskStatuses.Completed
    );
  }

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasks(props.todolist.id));
    }
  }, []);

  return (
    <div>
      <EditableSpan
        title={props.todolist.title}
        onChange={changeTodolistTitleCB}
      />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <DeleteIcon />
      </IconButton>
      <AddItemForm
        addItem={addTaskCB}
        disabled={props.todolist.entityStatus === "loading"}
      />
      <ul>
        {tasksForTodoList.map((task) => {
          return (
            <Task
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
              removeTask={removeTask}
              task={task}
              todolistId={props.todolist.id}
              key={task.id}
            />
          );
        })}
      </ul>
      <div>
        <Button
          size="large"
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={"warning"}
          size="large"
          variant={props.todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={"success"}
          size="large"
          variant={props.todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
