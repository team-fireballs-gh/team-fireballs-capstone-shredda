import {
  getFirestore,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "reviews";

const ADD_REVIEW = "ADD_REVIEW";
const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";

const _addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const _getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

const _updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

const _deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      const reviewDocRef = await addDoc(
        collection(firestoreDB, COLLECTION),
        review
      );

      dispatch(_addReview(reviewDocRef));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllReviews = () => {
  return async (dispatch) => {
    let result = [];
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, COLLECTION));

      querySnapshot.forEach((doc) => result.push(doc.data()));
      dispatch(_getAllReviews(result));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateReview = (id, review) => {
  return async (dispatch) => {
    try {
      const reviewRef = doc(firestoreDB, COLLECTION, id);
      const updatedReview = await updateDoc(reviewRef, review);
      dispatch(_updateReview(updatedReview));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteReview = (id) => {
  return async (dispatch) => {
    try {
      const deletedReview = await deleteDoc(doc(firestoreDB, COLLECTION, id));
      dispatch(_deleteReview(deletedReview));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return action.review;
    case GET_ALL_REVIEWS:
      return action.reviews;
    case UPDATE_REVIEW:
      return action.review;
    case DELETE_REVIEW:
      return [...state].filter((review) => review.id !== action.review.id);
    default:
      return state;
  }
};

export default reviewsReducer;
