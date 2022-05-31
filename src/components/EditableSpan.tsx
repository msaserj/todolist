import React, {ChangeEvent, useState} from 'react';

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
        ? <input autoFocus value={title} onBlur={OnBlurHandler} onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
};

