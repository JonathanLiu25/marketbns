import axios from "axios";
import { setLoading, stopLoading } from "./loading.js";

// ACTION TYPE
export const SET_ITEMS = "SET_ITEMS";

// ACTION CREATOR
export const setItems = allItems => ({
  type: SET_ITEMS,
  allItems
});

// THUNK
let tempInterval;

export const getItems = () =>
  dispatch => {
    tempInterval = setInterval(() => itemsRequest(dispatch), 10000);
    return itemsRequest(dispatch);
  };

function itemsRequest(dispatch) {
  dispatch(setLoading());
  return axios.get("/items")
    .then(res => res.data)
    .then(allItems => {
      dispatch(setItems(allItems));
      dispatch(stopLoading());
    })
    .catch(console.error);
}

export const stopItemsRequest = () =>
  dispatch =>
    clearInterval(tempInterval);

// REDUCER
const initialState = {
  allItems: []
};

const itemsReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_ITEMS:
      newState.allItems = action.allItems;
      break;
    default:
      break;
  }

  return newState;
};

export default itemsReducer;
