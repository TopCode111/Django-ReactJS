import { GET_ERRORS, CREATE_MESSAGE } from "./types";

export const returnErrors = (msg, status) => ({
  type: GET_ERRORS,
  payload: { msg, status }
});

export const createMessage = msg => ({
  type: CREATE_MESSAGE,
  payload: msg
});