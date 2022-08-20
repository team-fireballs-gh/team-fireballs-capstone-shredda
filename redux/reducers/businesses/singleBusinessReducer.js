const GET_SINGLE_BUSINESS = "GET_SINGLE_BUSINESS";
// CONSIDER making the collection name a const to use in thunk

const _getSingleBusiness = (business) => {
  return {
    type: GET_SINGLE_BUSINESS,
    business,
  };
};

export const getSingleBusiness = (id) => {
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

const singleBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_BUSINESS:
      return action.business;
    default:
      return state;
  }
};

export default singleBusinessReducer;
