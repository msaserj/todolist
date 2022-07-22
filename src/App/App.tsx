import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {initializaAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useAppDispatch} from "./hooks";
import {logOutTC} from "../features/Login/auth-reducer";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log("App is called")
    const status = useSelector<RootState, RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<RootState, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<RootState, boolean>(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(initializaAppTC())
    }, [])
    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    },[])


    if (!initialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress />
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
                    </Toolbar>

                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistsList demo={demo}/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path="*" element={<Navigate to="/404"/>}/>
                    </Routes>
                    {/*universal component*/}
                </Container>
            </div>
        </BrowserRouter>


    );
}

export default App;
