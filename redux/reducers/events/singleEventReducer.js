const GET_SINGLE_EVENT = "GET_SINGLE_EVENT";
// CONSIDER making the collection name a const to use in thunk

const _getSingleEvent = (event) => {
  return {
    type: GET_SINGLE_EVENT,
    event,
  };
};

export const getSingleEvent = (id) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to fetch a single doc in collection
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const singleEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_EVENT:
      return action.event;
    default:
      return state;
  }
};

export default singleEventReducer;
