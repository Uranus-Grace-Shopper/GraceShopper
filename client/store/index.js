import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./products";
import singleProduct from "./singleProduct";
import cart from "./cart";
import users from "./users"

const reducer = combineReducers({ auth, products, singleProduct, cart, users});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

console.log("getStore----------------------",store.getState)
export default store;
export * from "./auth";
