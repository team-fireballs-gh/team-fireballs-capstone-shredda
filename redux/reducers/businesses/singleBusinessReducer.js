import { getFirestore, getDoc } from "firebase/firestore";
import db from "../../../firebase/db";
const firestoreDB = getFirestore(db);
const COLLECTION = "businesses";

const GET_SINGLE_BUSINESS = "GET_SINGLE_BUSINESS";

const _getSingleBusiness = (business) => {
  return {
    type: GET_SINGLE_BUSINESS,
    business,
  };
};

export const getSingleBusiness = (id) => {
  return async (dispatch) => {
    try {
      // consider querying this from firebase with all "associations" or commonalities across all collections??
      const singleBusinessRef = doc(firestoreDB, COLLECTION, id);
      const docSnap = await getDoc(singleBusinessRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //dispatch(_getSingleBusiness(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const singleBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_BUSINESS:
      return action.business;
    default:
      return state;
  }
};

export default singleBusinessReducer;
