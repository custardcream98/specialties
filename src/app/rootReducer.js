import { combineReducers } from "redux";
import loggedReducer from "app/loggedReducer";
import profileReducer from "app/profileReducer";

const rootReducer = combineReducers({
  isUserLoggedIn: loggedReducer,
  profile: profileReducer,
});

export default rootReducer;
