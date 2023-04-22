import React, { ChangeEvent, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";

type TaskPropsType = {
  changeTaskStatus: (
    todolistID: string,
    id: string,
    status: TaskStatuses
  ) => void;
  changeTaskTitle: (todolistID: string, id: string, newTitle: string) => void;
  removeTask: (param: {todolistId: string, taskId: string}) => void;
  task: TaskType;
  todolistId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => {
    props.removeTask({todolistId: props.todolistId, taskId: props.task.id});
  };
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(
      props.todolistId,
      props.task.id,
      newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
    );
  };
  const onChangeTitleHandler = useCallback(
    (newTitle: string) => {
      props.changeTaskTitle(props.todolistId, props.task.id, newTitle);
    },
    [props.task.id, props.changeTaskTitle, props.todolistId]
  );
  return (
    <li
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
      key={props.task.id}
    >
      <div className="tasks">
        <Checkbox
          color={"secondary"}
          onChange={onChangeStatusHandler}
          checked={props.task.status === TaskStatuses.Completed}
        />
        <EditableSpan
          title={props.task.title}
          onChange={onChangeTitleHandler}
        />
        {/*<span>{task.title}</span>*/}
        <IconButton onClick={onClickHandler}>
          <DeleteIcon />
        </IconButton>
        {/*<button onClick={onClickHandler}>✖</button>*/}
      </div>
    </li>
  );
});
