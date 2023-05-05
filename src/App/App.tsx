import React, { useCallback, useEffect } from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { TodolistsList } from "../features/TodolistsList";
import { useSelector } from "react-redux";
import { appActions } from "../features/App";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, authSelectors, authActions } from "../features/Auth";
import { selectIsInitialized, selectStatus } from "../features/App/selectors";
import { useActions } from "../utils/redux-utils";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector(selectStatus);
  const initialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

  const { logOut } = useActions(authActions);
  const { initializeApp } = useActions(appActions);

  useEffect(() => {
    if (!demo) {
      initializeApp();
    }
  }, []);
  const logOutHandler = useCallback(() => {
    logOut();
  }, []);

  if (!initialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar
        style={{ background: "black", opacity: "50%", position: "sticky" }}
      >
        <Toolbar>
          <h1 style={{ fontSize: "50px", margin: "0 50px 0" }}>TodoList</h1>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          {isLoggedIn && (
            <Button onClick={logOutHandler} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/inc-todolist" element={<TodolistsList demo={demo} />} />
          <Route path="/" element={<TodolistsList demo={demo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
