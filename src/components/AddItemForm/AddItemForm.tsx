import {Grid, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormType) => {
    console.log("AdditemForm is called")
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addItemHandler = () => {
        if (title.trim()) {
            addItem(title);
            setTitle('')
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            addItemHandler()
        }
    }
    return (
        <Grid xs={12}>
            <TextField
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
                variant={"outlined"}
                size={"small"}
                label={"Type task"}
                error={!!error}
                helperText={error}
                value={title}/>
            <IconButton color={"warning"} size="medium" onClick={addItemHandler} disabled={disabled}>
                <AddCircleOutlineIcon/>
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </Grid>
    );
})

