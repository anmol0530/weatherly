import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import searches from "./searches";

const rootReducer = combineReducers({
  currentUser,
  errors,
  searches,
});

export default rootReducer;
