import {AppRootStateType} from "../../App/store";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn