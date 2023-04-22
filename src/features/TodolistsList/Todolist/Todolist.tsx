import React, {useCallback, useEffect} from "react";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValueType, TodolistDomainType} from "../todolist-reducer";
import {useAppDispatch} from "../../../App/hooks";
import {fetchTasks} from "../task-reducer";
import {useActions} from "../../../App/store";
import {tasksActions, todoListsActions} from "../index";

type PropsType = {
    todolist: TodolistDomainType;
    tasks: Array<TaskType>;
    demo?: boolean;
};

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useAppDispatch();

    const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = useActions(todoListsActions)


    const addTaskCB = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
            let thunk = tasksActions.addTask({todolistId: props.todolist.id, title});
            const resultAction = await dispatch(thunk);
            if (tasksActions.addTask.rejected.match(resultAction)) {
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
        }, [props.todolist.title, props.todolist.id]);
    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id);
    };
    const changeTodolistTitleCB = useCallback(
        (title: string) => {
            changeTodolistTitle({todolistId: props.todolist.id, title});
        },
        [props.todolist.id]
    );

    const onClickFilterButton = useCallback(
        (filter: FilterValueType) => changeTodolistFilter({todolistId: props.todolist.id, filter: filter}),
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
    const renderButtonFilter = (buttonFilter: FilterValueType,
                                color: any,
                                text: string) => {
        return <Button color={color} size="large"
                       variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                       onClick={()=>onClickFilterButton(buttonFilter)}>{text}</Button>}

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasks(props.todolist.id));
        }
    }, []);

    return (
        <Paper style={{padding: '10px', position: 'relative'}}  elevation={3}>
            <IconButton
                style={{position: 'absolute', right: '10px', top: '20px'}}
                onClick={removeTodolistHandler}
                disabled={props.todolist.entityStatus === "loading"}>
                <DeleteIcon/>
            </IconButton>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitleCB}/>
            </h3>
            <AddItemForm addItem={addTaskCB} disabled={props.todolist.entityStatus === "loading"}/>
            <ul>
                {tasksForTodoList.map((task) => {
                    return (
                        <Task task={task} todolistId={props.todolist.id} key={task.id}/>
                    );
                })}
                {!tasksForTodoList.length && <span>no tasks</span>}
            </ul>
            <div>
                {renderButtonFilter('all', 'primary', 'All')}
                {renderButtonFilter('active', 'warning', 'Active')}
                {renderButtonFilter('completed', 'success', 'Completed')}

            </div>
        </Paper>
    );
});
