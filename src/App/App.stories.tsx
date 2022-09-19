import React from "react";
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

// const changeCallBack = action("Value changed")

export const AppBaseExample = () => {
    return <App demo={true} />
}