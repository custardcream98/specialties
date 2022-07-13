import { SET_USER_STATUS } from "app/actionNames";

export const setUserStatus = ({ account, token }) => ({
  type: SET_USER_STATUS,
  payload: { account, token },
});
