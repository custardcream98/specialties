import { combineReducers } from "redux";
import loggedReducer from "app/loggedReducer";

const rootReducer = combineReducers({
  isUserLoggedIn: loggedReducer,
});

export default rootReducer;
