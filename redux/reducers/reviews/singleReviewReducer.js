import { getFirestore, getDoc } from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "reviews";

const GET_SINGLE_REVIEW = "GET_SINGLE_REVIEW";
// CONSIDER making the collection name a const to use in thunk

const _getSingleReview = (review) => {
  return {
    type: GET_SINGLE_REVIEW,
    review,
  };
};

export const getSingleReview = (id) => {
  return async (dispatch) => {
    try {
      const singleReviewRef = doc(firestoreDB, COLLECTION, id);
      const docSnap = await getDoc(singleReviewRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //dispatch(_getSingleReview(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const singleReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_REVIEW:
      return action.review;
    default:
      return state;
  }
};

export default singleReviewReducer;
