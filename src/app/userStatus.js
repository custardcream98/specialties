import { SET_USER_STATUS } from "app/actionNames";

export const userStatusReducer = (
  state = { isLoggedIn: false, account: "", token: "" },
  action
) => {
  switch (action.type) {
    case SET_USER_STATUS:
      let { account, token } = action.payload;
      return {
        isLoggedIn: true,
        account: account,
        token: token,
      };
    default:
      return state;
  }
};
