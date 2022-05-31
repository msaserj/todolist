import { Button } from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';



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
        <div>
            <input type="text"
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button variant="contained" onClick={addItem}>+</Button>
            {/*<button onClick={addItem}>+</button>*/}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

