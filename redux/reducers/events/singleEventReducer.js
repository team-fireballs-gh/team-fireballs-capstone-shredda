import { getFirestore, getDoc } from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "events";

const GET_SINGLE_EVENT = "GET_SINGLE_EVENT";

const _getSingleEvent = (event) => {
  return {
    type: GET_SINGLE_EVENT,
    event,
  };
};

export const getSingleEvent = (id) => {
  return async (dispatch) => {
    try {
      const singleEventRef = doc(firestoreDB, COLLECTION, id);
      const docSnap = await getDoc(singleEventRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //dispatch(_getSingleEvent(docSnap.data());
      } else {
        console.log("No such document!");
      }
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
