import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/types";
import { useActions } from "../../utils/redux-utils";
import { appActions } from "../../common/actions/common.actions";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const error = useSelector<RootState, string | null>(
    (state) => state.app.error
  );
  const { setAppError } = useActions(appActions);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAppError({ error: null });
  };

  const isOpen = error !== null;
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        Error message: {error} 😠
      </Alert>
    </Snackbar>
  );
}
