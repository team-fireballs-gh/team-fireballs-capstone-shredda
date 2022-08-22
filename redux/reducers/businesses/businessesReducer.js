const ADD_BUSINESS = "ADD_BUSINESS";
const GET_ALL_BUSINESSES = "GET_ALL_BUSINESSES";
const UPDATE_BUSINESS = "UPDATE_BUSINESS";
const DELETE_BUSINESS = "DELETE_BUSINESS";
// CONSIDER making the collection name a const to use in thunk

const _addBusiness = (business) => {
  return {
    type: ADD_BUSINESS,
    business,
  };
};

const _getAllBusinesses = (businesses) => {
  return {
    type: GET_ALL_BUSINESSES,
    businesses,
  };
};

const _updateBusiness = (business) => {
  return {
    type: UPDATE_BUSINESS,
    business,
  };
};

const _deleteBusiness = (business) => {
  return {
    type: DELETE_BUSINESS,
    business,
  };
};

export const addBusiness = (business) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to add doc to collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllBusinesses = () => {
  return async (dispatch) => {
    try {
      // firebase hook or method to get all docs in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateBusiness = (id, business) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to update doc in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteBusiness = (id, business) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to delete doc from collection
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUSINESS:
      return action.business;
    case GET_ALL_BUSINESSES:
      return action.businesses;
    case UPDATE_BUSINESS:
      return action.business;
    case DELETE_BUSINESS:
      return [...state].filter(
        (business) => business.id !== action.business.id
      );
    default:
      return state;
  }
};

export default businessesReducer;
