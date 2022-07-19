import { combineReducers } from "redux";
import QuansReducer from "./quans";
import SearchReducer from "./search";
import React from "react";

export default combineReducers({
  QuansReducer,
  SearchReducer,
});
