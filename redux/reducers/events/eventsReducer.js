const ADD_EVENT = "ADD_EVENT";
const GET_ALL_EVENTS = "GET_ALL_EVENTS";
const UPDATE_EVENT = "UPDATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
// CONSIDER making the collection name a const to use in thunk

const _addEvent = (event) => {
  return {
    type: ADD_EVENT,
    event,
  };
};

const _getAllEvents = (events) => {
  return {
    type: GET_ALL_EVENTS,
    events,
  };
};

const _updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    event,
  };
};

const _deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    event,
  };
};

export const addEvent = (event) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to add doc to collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch) => {
    try {
      // firebase hook or method to get all docs in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateEVENT = (id, event) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to update doc in collection
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteEVENT = (id, event) => {
  return async (dispatch) => {
    try {
      // firebase hook or method to delete doc from collection
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return action.event;
    case GET_ALL_EVENTS:
      return action.events;
    case UPDATE_EVENT:
      return action.event;
    case DELETE_EVENT:
      return [...state].filter((event) => event.id !== action.event.id);
    default:
      return state;
  }
};

export default eventsReducer;
