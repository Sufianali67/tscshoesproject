import { combineReducers } from "redux";
import Auth from "./Auth.js";
import Product from "./Product.js";
import User from "./User.js";

export default combineReducers({
  Auth,
  Product,
  User,
});
