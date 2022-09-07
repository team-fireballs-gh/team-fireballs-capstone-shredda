import { collection, getDocs } from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "events";

const GET_ALL_RSVP_EVENTS = "GET_ALL_RSVP_EVENTS";

const _getAllRsvpEvents = (events) => {
  return {
    type: GET_ALL_RSVP_EVENTS,
    events,
  };
};

export const getAllRsvpEvents = (userId) => {
  return async (dispatch) => {
    let result = [];
    try {
      const querySnapshot = await getDocs(
        collection(firestoreDB, "users", userId, "rsvp")
      );
      querySnapshot.forEach((doc) => {
        result.push({ data: doc.data() });
      });
      dispatch(_getAllRsvpEvents(result));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const rsvpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RSVP_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default rsvpReducer;
