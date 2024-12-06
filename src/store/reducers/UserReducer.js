import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../action/UserAction";

const UserState = {
  token: null,
  loading: false,
  error: null,
};

export const UserReducer = (state = UserState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
