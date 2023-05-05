import { AppRootStateType } from "../../App/store";

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectIsInitialized = (state: AppRootStateType) =>
  state.app.isInitialized;
