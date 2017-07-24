// ACTION TYPE
export const SET_SEARCH_ITEM = "SET_SEARCH_ITEM";
export const SET_EXACT = "SET_EXACT";
export const SET_NON_EXACT = "SET_NON_EXACT";

// ACTION CREATOR
export const searchForItem = itemName => ({
  type: SET_SEARCH_ITEM,
  itemName
});

export const setExactItem = () => ({
  type: SET_EXACT
});

export const setNonExactItem = () => ({
  type: SET_NON_EXACT
});

// THUNK
export const setSearchItem = (itemName) =>
  dispatch =>
    dispatch(searchForItem(itemName));

export const setExact = () =>
  dispatch =>
    dispatch(setExactItem());

export const setNonExact = () =>
  dispatch =>
    dispatch(setNonExactItem());

// REDUCER
const initialState = {
  itemName: "",
  exact: 0
};

const searchReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_SEARCH_ITEM:
      newState.itemName = action.itemName;
      break;
    case SET_EXACT:
      newState.exact = 1;
      break;
    case SET_NON_EXACT:
      newState.exact = 0;
      break;
    default:
      break;
  }

  return newState;
};

export default searchReducer;
