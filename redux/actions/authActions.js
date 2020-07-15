import Auth from '@aws-amplify/auth'
import {
  SIGN_IN,
  SIGN_IN_REQUEST,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_OUT_FAIL,
} from '../actionTypes'

export const signIn = (email, password) => async dispatch => {
  try {
    dispatch({
      type: SIGN_IN_REQUEST,
    })

    const response = await Auth.signIn(email, password)

    dispatch({
      type: SIGN_IN,
      payload: response,
    })
  } catch (err) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: err,
    })
  }
}

export const signOut = () => async dispatch => {
  try {
    await Auth.signOut()

    dispatch({
      type: SIGN_OUT,
    })
  } catch (err) {
    dispatch({
      type: SIGN_OUT_FAIL,
      payload: err,
    })
  }
}
