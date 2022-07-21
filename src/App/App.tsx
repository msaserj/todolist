import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Login} from "../features/Login/Login";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log("App is called")
    const status = useSelector<RootState, RequestStatusType>((state) => state.app.status)
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
                        <Button color="inherit">Login</Button>
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
