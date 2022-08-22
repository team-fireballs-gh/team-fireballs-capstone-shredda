const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const _logIn = (authUser) => {
  return {
    type: LOG_IN,
    authUser,
  };
};

const _logOut = (authUser) => {
  return {
    type: LOG_OUT,
    authUser,
  };
};

export const logIn = (uid) => {
  return async (dispatch) => {
    dispatch(_logIn({ uid: uid, loggedIn: true }));
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(_logOut({ uid: null, loggedIn: false }));
  };
};

const authStatusReducer = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.authUser;
    case LOG_OUT:
      return action.authUser;
    default:
      return state;
  }
};

export default authStatusReducer;
