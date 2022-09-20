import { combineReducers } from "redux";
import QuansReducer from "./quans";
import SearchReducer from "./search";
import TagReducer from "./tag";
import MyQuestionReducer from "./myQuestion";
import MyAnswerReducer from "./myAnswer";
import MyAccountReducer from "./myAccount";
import React from "react";

export default combineReducers({
  QuansReducer,
  SearchReducer,
  TagReducer,
  MyQuestionReducer,
  MyAnswerReducer,
  MyAccountReducer,
});
