import React, { ChangeEvent, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { tasksActions } from "../../index";
import { useActions } from "../../../../utils/redux-utils";
import { TaskStatuses, TaskType } from "../../../../api/types";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const { updateTask, removeTask } = useActions(tasksActions);

  const onClickHandler = () => {
    removeTask({ todolistId: props.todolistId, taskId: props.task.id });
  };
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    updateTask({
      todolistId: props.todolistId,
      taskId: props.task.id,
      domainModel: {
        status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      },
    });
  };

  const onChangeTitleHandler = useCallback(
    (newTitle: string) => {
      updateTask({
        todolistId: props.todolistId,
        taskId: props.task.id,
        domainModel: { title: newTitle },
      });
    },
    [props.task.id, props.todolistId]
  );

  return (
    <li
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
      key={props.task.id}
    >
      <div className="tasks" style={{ position: "relative" }}>
        <Checkbox
          color={"secondary"}
          onChange={onChangeStatusHandler}
          checked={props.task.status === TaskStatuses.Completed}
        />

        <EditableSpan
          title={props.task.title}
          onChange={onChangeTitleHandler}
        />

        <IconButton
          onClick={onClickHandler}
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
});
