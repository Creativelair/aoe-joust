import { GET_CIVILIZATIONS, GET_CIVILIZATIONS_REQUEST, GET_CIVILIZATIONS_FAIL } from '../actionTypes'

const initialState = {
  civilizations: [],
  loading: false,
  error: null,
}

export const civilizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CIVILIZATIONS:
      return {
        ...state,
        civilizations: action.payload,
        loading: false,
        error: null,
      }

    case GET_CIVILIZATIONS_REQUEST:
      return {
        ...state,
        civilizations: [],
        loading: true,
        error: null,
      }

    case GET_CIVILIZATIONS_FAIL:
      return {
        ...state,
        civilizations: [],
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
