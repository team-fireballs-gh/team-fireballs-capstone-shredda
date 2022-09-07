import {
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "events";

const GET_ALL_EVENTS = "GET_ALL_EVENTS";
const GET_ALL_INTERESTED_EVENTS = "GET_ALL_INTERESTED_EVENTS";

const _getAllEvents = (events) => {
  return {
    type: GET_ALL_EVENTS,
    events,
  };
};

const _getAllInterestedEvents = (events) => {
  return {
    type: GET_ALL_INTERESTED_EVENTS,
    events,
  };
};

export const addEvent = async (event) => {
  try {
    await addDoc(collection(firestoreDB, COLLECTION), event);
  } catch (err) {
    console.error(err);
  }
};

export const getAllEvents = () => {
  return async (dispatch) => {
    let result = [];
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, COLLECTION));

      querySnapshot.forEach((doc) =>
        result.push({ id: doc.id, data: doc.data() })
      );
      dispatch(_getAllEvents(result));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateEvent = async (id, event) => {
  try {
    const eventRef = doc(firestoreDB, COLLECTION, id);
    await updateDoc(eventRef, event);
  } catch (err) {
    console.error(err);
  }
};

export const deleteEvent = async (id) => {
  try {
    await deleteDoc(doc(firestoreDB, COLLECTION, id));
  } catch (err) {
    console.error(err);
  }
};

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default eventsReducer;
