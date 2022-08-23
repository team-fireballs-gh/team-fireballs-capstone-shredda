import {
  getFirestore,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase/db";
const firestoreDB = getFirestore(db);
const COLLECTION = "businesses";

const ADD_BUSINESS = "ADD_BUSINESS";
const GET_ALL_BUSINESSES = "GET_ALL_BUSINESSES";
const UPDATE_BUSINESS = "UPDATE_BUSINESS";
const DELETE_BUSINESS = "DELETE_BUSINESS";

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
      const businessRef = await addDoc(
        collection(firestoreDB, COLLECTION),
        business
      );
      dispatch(_addBusiness(businessRef));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllBusinesses = () => {
  return async (dispatch) => {
    let result = [];
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, COLLECTION));

      querySnapshot.forEach((doc) => result.push(doc.data()));
      dispatch(_getAllBusinesses(result));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateBusiness = (id, business) => {
  return async (dispatch) => {
    try {
      const businessRef = doc(firestoreDB, COLLECTION, id);
      const updatedBusiness = await updateDoc(businessRef, business);
      dispatch(_updateBusiness(updateBusiness));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteBusiness = (id) => {
  return async (dispatch) => {
    try {
      const deletedBusiness = await deleteDoc(doc(firestoreDB, COLLECTION, id));
      dispatch(_deleteBusiness(deletedBusiness));
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
