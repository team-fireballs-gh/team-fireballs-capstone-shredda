import { collection, getDocs } from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";

const GET_ALL_INTERESTED_EVENTS = "GET_ALL_INTERESTED_EVENTS";

const _getAllInterestedEvents = (events) => {
  return {
    type: GET_ALL_INTERESTED_EVENTS,
    events,
  };
};

export const getAllInterestedEvents = (userId) => {
  return async (dispatch) => {
    let result = [];
    try {
      const querySnapshot = await getDocs(
        collection(firestoreDB, "users", userId, "interested")
      );
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      dispatch(_getAllInterestedEvents(result));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const interestedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INTERESTED_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default interestedReducer;
