import axios from "axios";

// ACTION TYPE
export const SET_ITEMS = "SET_ITEMS";

// ACTION CREATOR
export const setItems = allItems => ({
  type: SET_ITEMS,
  allItems
});

// THUNK
export const getItems = () =>
  dispatch => {
    setInterval(() => itemsRequest(dispatch), 10000);
    return itemsRequest(dispatch);
  };

function itemsRequest(dispatch) {
  return axios.get("/items")
    .then(res => res.data)
    .then(allItems => dispatch(setItems(allItems)))
    .catch(console.error);
}

export const addItem = item =>
  dispatch =>
    axios.post("/items", item)
      // .then(res => res.data)
      // .then(newItem => console.log("new item", newItem))
      .catch(console.error);

// REDUCER
const initialState = {
  allItems: []
};

const itemReducer = (state = initialState, action) => {
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

export default itemReducer;
