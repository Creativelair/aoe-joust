import {
  SIGN_IN,
  SIGN_IN_REQUEST,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_OUT_FAIL,
} from '../actionTypes'

const initialState = {
  user: null,
  loading: false,
  error: null,
  signOutError: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }

    case SIGN_IN_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      }

    case SIGN_IN_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      }

    case SIGN_OUT:
      return {
        ...state,
        user: null,
        signOutError: null,
      }

    case SIGN_OUT_FAIL:
      return {
        ...state,
        signOutError: action.payload,
      }

    default:
      return state
  }
}
