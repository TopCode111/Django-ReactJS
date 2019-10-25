import axios from "axios";
import { returnErrors } from "./errors";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_LOADING,
  CLEAR_ERRORS,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/api/auth/user", tokenBuild(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (email, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenBuild(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const signup = newUser => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ ...newUser });

  axios
    .post("/api/auth/signup", body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SIGNUP_FAIL
      });
    });
};

export const patientRegister = patient => (dispatch, getState) => {

  dispatch({
    type: PATIENT_LOADING
  })
  dispatch({
    type: CLEAR_ERRORS
  })
  
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ ...patient });

  axios
    .post("/api/patient", body, tokenBuild(getState))
    .then(res => {
      dispatch({
        type: PATIENT_REGISTER_SUCCESS,
        payload: res.data.patient
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PATIENT_REGISTER_FAIL
      });
    });
};

// helpers
export const tokenBuild = getState => {
  const token = getState().authReducer.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
