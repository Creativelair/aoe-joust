import { GET_MAPS, GET_MAPS_REQUEST, GET_MAPS_FAIL } from '../actionTypes'

const initialState = {
  maps: [],
  map: {},
  loading: false,
  error: null,
}

export const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAPS:
      return {
        ...state,
        maps: action.payload,
        loading: false,
        error: null,
      }

    case GET_MAPS_REQUEST:
      return {
        ...state,
        maps: [],
        loading: true,
        error: null,
      }

    case GET_MAPS_FAIL:
      return {
        ...state,
        maps: [],
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
