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
} from "../actions/types.js";

const initialState = {
  patients: [],
  protocols: [],
  questions: [],
  isPatientLoading: false,
  isQuestionLoading: false,
  isQuestionPosted: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PATIENT_LOADING:
        return {
          ...state,
          isPatientLoading: true
        };
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(patient => patient.id != action.payload)
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload],
        isPatientLoading: false
      };
    case GET_PROTOCOLS:
      return {
        ...state,
        protocols: action.payload
      };
    case GET_QUESTIONS:
      return {
        ...state,
        isQuestionLoading: false,
        questions: action.payload
      };
    case QUESTIONS_LOADING:
      return {
        ...state,
        isQuestionLoading: true
      };
    case POST_QUESTION:
      return {
        ...state,
        isQuestionLoading: false,
        isQuestionPosted: true
      };
    case POST_QUESTION_FAILED:
      return {
        ...state,
        isQuestionLoading: false,
        isQuestionPosted: false
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((item, index) => {
          if (item.id == action.payload.id) {
            return {
              ...item,
              answer: action.payload.answer
            }
          }
          return item;
        })
      }
    default:
      return state;
  }
}
