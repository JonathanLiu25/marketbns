import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

let enhancer = applyMiddleware(thunkMiddleware);

if (process.env.NODE_ENV !== "production") {
  enhancer = composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      createLogger({ collapsed: true })
    )
  );
}

const store = createStore(
  rootReducer,
  enhancer
);

export default store;
