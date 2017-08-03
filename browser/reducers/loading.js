// ACTION TYPE
export const SET_LOADING = "SET_LOADING";
export const STOP_LOADING = "STOP_LOADING";

// ACTION CREATOR
export const setLoading = () => ({
  type: SET_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

// THUNK
export const setLoad = () =>
  dispatch =>
    dispatch(setLoading());

export const stopLoad = () =>
  dispatch =>
    dispatch(stopLoading());

// REDUCER
const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      break;
  }

  return state;
};

export default loadingReducer;
