import { USER_LOGIN, SET_PROFILE } from "app/actionNames";

export const userLogin = () => ({
  type: USER_LOGIN,
});

export const setProfile = (username, address) => ({
  type: SET_PROFILE,
  payload: { username, address },
});
