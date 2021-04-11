import { findByLabelText } from "@testing-library/react";
import { LOAD_SEARCHES, REMOVE_SEARCH } from "../actionTypes";

const search = (state = [], action) => {
  switch (action.type) {
    case LOAD_SEARCHES:
      return [...action.searches];
    case REMOVE_SEARCH:
      return state.filter((search) => search._id !== action.id);
    default:
      return state;
  }
};

export default search;
