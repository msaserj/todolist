import { appReducer } from "./index";
import { InitialStateType } from "./app-reducer";
import { setAppError, setAppStatus } from "../../common/actions/common.actions";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: true,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatus({ status: "loading" }));
  expect(endState.status).toBe("loading");
});
