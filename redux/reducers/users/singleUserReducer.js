import { getFirestore, getDoc } from "firebase/firestore";
import { db as firestoreDB } from "../../../firebase/db";
const COLLECTION = "users";

const GET_SINGLE_USER = "GET_SINGLE_USER";

const _getSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

export const getSingleUser = (uid) => {
  return async (dispatch) => {
    try {
      // consider querying this from firebase with all "associations" or commonalities across all collections??
      const singleUserRef = doc(firestoreDB, COLLECTION, uid);
      const docSnap = await getDoc(singleUserRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //dispatch(_getSingleUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
};

export default singleUserReducer;
