import { combineReducers } from "redux";
import authStatusReducer from "./authStatus";
import usersReducer from "./users/usersReducer";
import singleUserReducer from "./users/singleUserReducer";
import reviewsReducer from "./reviews/reviewsReducer";
import singleReviewReducer from "./reviews/singleReviewReducer";
import eventsReducer from "./events/eventsReducer";
import singleEventReducer from "./events/singleEventReducer";
import businessesReducer from "./businesses/businessesReducer";
import singleBusinessReducer from "./businesses/singleBusinessReducer";

const rootReducer = combineReducers({
  authStatus: authStatusReducer,
  users: usersReducer,
  singleUser: singleUserReducer,
  reviews: reviewsReducer,
  singleReview: singleReviewReducer,
  events: eventsReducer,
  singleEvent: singleEventReducer,
  businesses: businessesReducer,
  singleBusiness: singleBusinessReducer,
});

export default rootReducer;
