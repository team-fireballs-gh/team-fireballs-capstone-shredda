const ADD_REVIEW = "ADD_REVIEW";
const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";
// CONSIDER making the collection name a const to use in thunk

const _addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const _getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

const _updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

const _deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to add doc to collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      // firebase hook or method to get all docs in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateReview = (id, review) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to update doc in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteReview = (id, review) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to delete doc from collection
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return action.review;
    case GET_ALL_REVIEWS:
      return action.reviews;
    case UPDATE_REVIEW:
      return action.review;
    case DELETE_REVIEW:
      return [...state].filter((review) => review.id !== action.review.id);
    default:
      return state;
  }
};

export default reviewsReducer;
