import {
  getFirestore,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "users";

const ADD_USER = "ADD_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

const _addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

const _getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const addUser = (uid, user) => {
  return async (dispatch) => {
    try {
      const userRef = doc(firestoreDB, COLLECTION, uid);
      const addedUser = await setDoc(userRef, user, { merge: true });
      dispatch(_addUser(addedUser));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    let result = [];
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, COLLECTION));

      querySnapshot.forEach((doc) => result.push(doc.data()));
      dispatch(_getAllUsers(result));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateUser = (uid, user) => {
  return async (dispatch) => {
    try {
      const userRef = doc(firestoreDB, COLLECTION, uid);
      const updatedUser = await updateDoc(userRef, user);
      dispatch(_updateUser(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteUser = (uid, user) => {
  return async (dispatch) => {
    try {
      const deletedUser = await deleteDoc(doc(firestoreDB, COLLECTION, uid));
      dispatch(_deleteUser(deletedUser));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.event;
    case GET_ALL_USERS:
      return action.events;
    case UPDATE_USER:
      return action.event;
    case DELETE_USER:
      return [...state].filter((user) => user.uid !== action.user.uid);
    default:
      return state;
  }
};

export default usersReducer;
