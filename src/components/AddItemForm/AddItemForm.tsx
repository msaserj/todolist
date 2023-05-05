import { Grid, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export type AddItemFormSubmitHelperType = {
  setError: (error: string) => void;
  setTitle: (title: string) => void;
};

type AddItemFormType = {
  addItem: (title: string, helper: AddItemFormSubmitHelperType) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo(
  ({ addItem, disabled = false }: AddItemFormType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addItemHandler = async () => {
      if (title.trim() !== "") {
        addItem(title, { setError, setTitle });
      } else {
        setError("Title is required");
      }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError(null);
      }
      if (e.key === "Enter") {
        addItemHandler();
      }
    };
    return (
      <Grid xs={12}>
        <TextField
          disabled={disabled}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
          variant={"outlined"}
          size={"small"}
          label={"Type task"}
          error={!!error}
          helperText={error}
          value={title}
        />
        <IconButton
          color={"warning"}
          size="medium"
          onClick={addItemHandler}
          disabled={disabled}
          style={{ marginLeft: "5px" }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    );
  }
);
