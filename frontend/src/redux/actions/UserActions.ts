const ActionTypes = {
  SIGN_IN_SUCCESS: "[User] Login Success",
  SIGN_IN_ERROR: "[User] Login Error",
  SIGN_OUT: "[User] Logout",
};

const loginSuccess = (user: object) => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    user,
  };
};
const loginError = (error: string) => {
  return {
    type: ActionTypes.SIGN_IN_ERROR,
    error,
  };
};

const logout = () => {
  return { type: ActionTypes.SIGN_OUT };
};

const UserActions = { loginSuccess, loginError, logout, ActionTypes };
export default UserActions;
