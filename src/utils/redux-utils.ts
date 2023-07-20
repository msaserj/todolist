import { ActionCreatorsMapObject, bindActionCreators } from "redux";
import { useAppDispatch } from "./hooks";
import { useMemo } from "react";

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, []);
}

