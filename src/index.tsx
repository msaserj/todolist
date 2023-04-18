import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from "./App/App";
import {Provider} from "react-redux";
import {store} from "./App/store";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
