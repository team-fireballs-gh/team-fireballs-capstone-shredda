const GET_SINGLE_USER = "GET_SINGLE_USER";
// CONSIDER making the collection name a const to use in thunk

const _getSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

export const getSingleUser = (id) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to fetch a single doc in collection
      // consider querying this from firebase with all "associations" or commonalities across all collections
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
};

export default singleUserReducer;
