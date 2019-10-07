import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST
} from "../action/types";

const intialState = {
  user: [],
  errorMessage: "",
  loading: ""
};
export default function authReducer(state = intialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.response.data, loading: false };
    case LOGIN_FAILED:
      return { ...state, errorMessage: action.response.data };
    case SIGNUP_SUCCESS:
      return { ...state, user: action.response.data };
    default:
      return state;
  }
}
