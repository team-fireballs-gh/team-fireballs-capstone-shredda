import { doc, getDoc } from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "events";

const GET_ALL_RSVP_EVENTS = "GET_ALL_RSVP_EVENTS";

const _getAllRsvpEvents = (events) => {
  return {
    type: GET_ALL_RSVP_EVENTS,
    events,
  };
};

export const getAllRsvpEvents = (arrayOfRsvpIds) => {
  return async (dispatch) => {
    let result = [];
    try {
      arrayOfRsvpIds.map(async (rsvp) => {
        const rsvpEventRef = doc(firestoreDB, COLLECTION, rsvp);
        const docSnap = await getDoc(rsvpEventRef);

        if (docSnap.exists()) {
          result.push(docSnap.data());
        } else {
          console.log("No such document!");
        }
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
