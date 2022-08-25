import {
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  doc
} from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
import { getSingleEvent } from "./singleEventReducer";
const COLLECTION = "events";


const ADD_EVENT = "ADD_EVENT";
const GET_ALL_EVENTS = "GET_ALL_EVENTS";
const UPDATE_EVENT = "UPDATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";

const _addEvent = (event, id) => {
  return {
    type: ADD_EVENT,
    event,
    id,
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

export const addEvent = async (event) => {    
  try {
      await addDoc(
        collection(firestoreDB, COLLECTION),
        event
      );
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

export const updateEvent = (id, event) => {
  return async (dispatch) => {
    try {
      const eventRef = doc(firestoreDB, COLLECTION, id);
      const updatedEvent = await updateDoc(eventRef, event);
      console.log("UPDATED EVENT!!:", updatedEvent)
      // dispatch(_updateEvent(updatedEvent));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      const deletedEvent = await deleteDoc(doc(firestoreDB, COLLECTION, id));
      dispatch(_deleteEvent(deletedEvent));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.event];
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
