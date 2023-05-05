import React from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { Provider } from "react-redux";
import { store } from "./App/store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorker.unregister();
