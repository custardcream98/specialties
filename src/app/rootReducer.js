import { combineReducers } from "redux";
import { userStatusReducer } from "app/userStatus";

const rootReducer = combineReducers({
  userStatus: userStatusReducer,
});

export default rootReducer;
