import { combineReducers } from "redux";
import item from "./item.js";
import items from "./items.js";
import search from "./search.js";

const rootReducer = combineReducers({
  item,
  items,
  search
});

export default rootReducer;
