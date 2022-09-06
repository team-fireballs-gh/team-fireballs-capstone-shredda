import { combineReducers } from "redux";
import usersReducer from "./users/usersReducer";
import singleUserReducer from "./users/singleUserReducer";
import reviewsReducer from "./reviews/reviewsReducer";
import singleReviewReducer from "./reviews/singleReviewReducer";
import eventsReducer from "./events/eventsReducer";
import singleEventReducer from "./events/singleEventReducer";
import businessesReducer from "./businesses/businessesReducer";
import singleBusinessReducer from "./businesses/singleBusinessReducer";
import rsvpReducer from "./events/rsvpReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  singleUser: singleUserReducer,
  reviews: reviewsReducer,
  singleReview: singleReviewReducer,
  events: eventsReducer,
  rsvps: rsvpReducer,
  // interestedEvents: interestedEventsReducer,
  singleEvent: singleEventReducer,
  businesses: businessesReducer,
  singleBusiness: singleBusinessReducer,
});

export default rootReducer;
