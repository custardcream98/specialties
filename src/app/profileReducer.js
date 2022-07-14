import { SET_PROFILE } from "app/actionNames";

const profileReducer = (state = { username: "", address: "" }, action) => {
  switch (action.type) {
    case SET_PROFILE:
      const { username, address } = action.payload;
      return { username, address };
    default:
      return state;
  }
};

export default profileReducer;
