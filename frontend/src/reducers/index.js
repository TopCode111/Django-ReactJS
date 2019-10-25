import { combineReducers } from "redux";
import authReducer from "./auth";
import errors from "./errors";
import patient from './patient'

export default combineReducers({
  authReducer,
  errors,
  patientReducer: patient
});
