import { combineReducers } from "redux";
import UIState from "./UIState";
import AppState from "./AppState";

const appReducer = combineReducers({
  UIState,
  AppState,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
