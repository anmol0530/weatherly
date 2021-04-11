import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_SEARCHES, REMOVE_SEARCH } from "../actionTypes";

export const loadSearches = (searches) => ({
  type: LOAD_SEARCHES,
  searches,
});

export const remove = (id) => ({
  type: REMOVE_SEARCH,
  id,
});

export const fetchSearches = () => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("get", `/api/users/${id}/searches`)
    .then((res) => {
      dispatch(loadSearches(res));
    })
    .catch((err) => {
      dispatch(addError(err.message));
    });
};

export const newSearch = (city, country) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/searches`, { city, country })
    .then(() => {})
    .catch((err) => {
      dispatch(addError(err.message));
    });
};

export const removeSearch = (user_id, search_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/users/${user_id}/searches/${search_id}`)
      .then(() => dispatch(remove(search_id)))
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};
