import axios from "axios";

// ACTION TYPE
export const SET_ITEM = "SET_ITEM";
export const LOADING = "LOADING";
export const LOADED = "LOADED";

// ACTION CREATOR
export const setItem = singleItem => ({
  type: SET_ITEM,
  singleItem
});

export const isLoading = () => ({
  type: LOADING
});

export const loaded = () => ({
  type: LOADED
});

// THUNK
export const getItem = (itemName, exact) =>
  dispatch => {
    dispatch(isLoading());
    return axios.get(`/items/${itemName}/?exact=${exact}`)
      .then(res => res.data)
      .then(singleItem => {
        dispatch(setItem(singleItem));
        dispatch(loaded());
      })
      .catch(console.error);
  };

export const addItem = item =>
  dispatch =>
    axios.post("/items", item)
      .catch(console.error);

export const changeItem = item =>
  dispatch =>
    axios.put(`/items/${item.name}`, item)
      .catch(console.error);

export const deleteItem = item =>
  dispatch =>
    axios.delete(`/items/${item.name}/${item.exact}`)
      .catch(console.error);

// REDUCER
const initialState = {
  singleItem: [],
  loading: true
};

const itemReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_ITEM:
      newState.singleItem = action.singleItem;
      break;
    case LOADING:
      newState.loading = true;
      break;
    case LOADED:
      newState.loading = false;
      break;
    default:
      break;
  }

  return newState;
};

export default itemReducer;
