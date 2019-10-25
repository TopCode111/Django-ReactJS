import axios from "axios";

import { createMessage, returnErrors } from "./errors";
import { tokenBuild } from "./auth";

import {
  GET_PATIENTS,
  DELETE_PATIENT,
  ADD_PATIENT,
  GET_PROTOCOLS,
  GET_QUESTIONS,
  UPDATE_QUESTION,
  QUESTIONS_LOADING,
  POST_QUESTION,
  PATIENT_LOADING,
  POST_QUESTION_FAILED
} from "./types";

export const getPatients = () => (dispatch, getState) => {
  axios
    .get("/api/patient", tokenBuild(getState))
    .then(response => {
      dispatch({
        type: GET_PATIENTS,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePatient = id => (dispatch, getState) => {
  axios
    .delete(`/api/patient/${id}`, tokenBuild(getState))
    .then(response => {
      dispatch({
        type: DELETE_PATIENT,
        payload: id
      });
      dispatch(createMessage({ deletepatient: `Patient deleted with id: ${id}` }));
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPatient = patient => (dispatch, getState) => {
  dispatch({
    type: PATIENT_LOADING
  })
  axios
    .post("/api/patient/", patient, tokenBuild(getState))
    .then(response => {
      dispatch({
        type: ADD_PATIENT,
        payload: response.data
      });
      dispatch(
        createMessage({ addpatient: `Patient added with id: ${response.data.id}` })
      );
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// PROTOCOL


export const getProtocols = () => (dispatch, getState) => {
  axios
    .get("/api/protocol", tokenBuild(getState))
    .then(response => {
      dispatch({
        type: GET_PROTOCOLS,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getQuestions = (uid, token) => (dispatch, getState) => {
  dispatch({
    type: QUESTIONS_LOADING
  })
  axios
    .get(`/api/survey/${uid}/${token}`, tokenBuild(getState))
    .then(response => {
      dispatch({
        type: GET_QUESTIONS,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateQuestion = question => ({
  type: UPDATE_QUESTION,
  payload: question
})

export const postQuestions = (uid, token, answers) => (dispatch, getState) => {
  dispatch({
    type: QUESTIONS_LOADING
  })
  axios
    .post(`/api/survey/${uid}/${token}`, answers, tokenBuild(getState))
    .then(response => {
      dispatch({
        type: POST_QUESTION
      });
      // dispatch(
      //   createMessage({ addpatient: `Patient added with id: ${response.data.id}` })
      // );
    })
    .catch(err => {
      dispatch({
        type: POST_QUESTION_FAILED
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    }
    );
};
