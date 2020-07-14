import {
  GET_PLAYERS,
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_FAIL,
  GET_PLAYERS_STATS,
  GET_PLAYERS_STATS_REQUEST,
  GET_PLAYERS_STATS_FAIL,
} from '../actionTypes'

const initialState = {
  players: [],
  playerStats: null,
  loading: false,
  loadingStats: false,
  error: null,
  errorStats: null,
}

export const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload,
        loading: false,
        error: null,
      }

    case GET_PLAYERS_REQUEST:
      return {
        ...state,
        players: [],
        loading: true,
        error: null,
      }

    case GET_PLAYERS_FAIL:
      return {
        ...state,
        players: [],
        loading: false,
        error: action.payload,
      }

    case GET_PLAYERS_STATS:
      return {
        ...state,
        playerStats: action.payload,
        loadingStats: false,
        errorStats: null,
      }

    case GET_PLAYERS_STATS_REQUEST:
      return {
        ...state,
        playerStats: null,
        loadingStats: true,
        errorStats: null,
      }

    case GET_PLAYERS_STATS_FAIL:
      return {
        ...state,
        playerStats: null,
        loadingStats: false,
        errorStats: action.payload,
      }

    default:
      return state
  }
}
