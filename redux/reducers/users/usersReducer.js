const ADD_USER = "ADD_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
// CONSIDER making the collection name a const to use in thunk

const _addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

const _getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to add doc to collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      // firebase hook or method to get all docs in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateUser = (id, user) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to update doc in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteUser = (id, user) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to delete doc from collection
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.event;
    case GET_ALL_USERS:
      return action.events;
    case UPDATE_USER:
      return action.event;
    case DELETE_USER:
      return [...state].filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};

export default usersReducer;
