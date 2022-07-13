import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

// const changeCallBack = action("Value changed")

export const AppBaseExample = () => {
    return <App/>
}