const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const _logIn = (authStatus) => {
  return {
    type: LOG_IN,
    authStatus,
  };
};

const _logOut = (authStatus) => {
  return {
    type: LOG_OUT,
    authStatus,
  };
};

export const logIn = () => {
  return async (dispatch) => {
    dispatch(_logIn(true));
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(_logOut(false));
  };
};

const authStatusReducer = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.authStatus;
    case LOG_OUT:
      return action.authStatus;
    default:
      return state;
  }
};

export default authStatusReducer;
