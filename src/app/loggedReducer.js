import { USER_LOGIN } from "app/actionNames";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return true;
    default:
      return state;
  }
};
export default loggedReducer;
