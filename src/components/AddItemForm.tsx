import {Grid, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    // переехало сюда
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim()) {
            props.addItem(title);
            setTitle('')
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem()
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
                value={title}

            />
            <IconButton color={"primary"} size="medium"  onClick={addItem}>
                <AddCircleOutlineIcon/>
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </Grid>
    );
};

