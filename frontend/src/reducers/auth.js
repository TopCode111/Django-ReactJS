import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_LOADING
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  isLoading: false,
  newPatient: null,
  isPatientLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PATIENT_LOADING:
        return {
          ...state,
          isPatientLoading: true
        };
    case PATIENT_REGISTER_SUCCESS:
      return {
        ...state,
        newPatient: action.payload,
        isPatientLoading: false
      };
    
    case PATIENT_REGISTER_FAIL:
      return {
        ...state,
        newPatient: null,
        isPatientLoading: false
      };

    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case SIGNUP_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    default:
      return state;
  }
}
