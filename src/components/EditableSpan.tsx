import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    const [title, setTitle] = useState('')
    const [editMode, setEditMode] = useState(false)

    const OnBlurHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant="standard" autoFocus value={title} onBlur={OnBlurHandler} onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
};

