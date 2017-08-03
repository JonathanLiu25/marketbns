import { combineReducers } from "redux";
import item from "./item.js";
import items from "./items.js";
import search from "./search.js";
import loading from "./loading.js";

const rootReducer = combineReducers({
  item,
  items,
  search,
  loading
});

export default rootReducer;
