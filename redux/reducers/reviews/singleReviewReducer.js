const GET_SINGLE_REVIEW = "GET_SINGLE_REVIEW";
// CONSIDER making the collection name a const to use in thunk

const _getSingleReview = (review) => {
  return {
    type: GET_SINGLE_REVIEW,
    review,
  };
};

export const getSingleReview = (id) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to fetch a single doc in collection
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const singleReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_REVIEW:
      return action.review;
    default:
      return state;
  }
};

export default singleReviewReducer;
