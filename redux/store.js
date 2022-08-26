import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: true,
});
