import {
  GET_MATCHES,
  GET_MATCHES_REQUEST,
  GET_MATCHES_FAIL,
  SAVE_MATCH_FAIL,
  GET_MATCH,
  GET_MATCH_REQUEST,
  GET_MATCH_FAIL,
  SAVE_MATCH_STATS,
  SAVE_MATCH_STATS_REQUEST,
  SAVE_MATCH_STATS_FAIL,
} from '../actionTypes'

const initialState = {
  matches: [],
  match: null,
  stats: null,
  loading: false,
  loadingStats: false,
  error: null,
  saveError: null,
  saveStatsError: null,
}

export const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
        loading: false,
        error: null,
        saveError: null,
      }

    case GET_MATCHES_REQUEST:
      return {
        ...state,
        matches: [],
        loading: true,
        error: null,
        saveError: null,
      }

    case GET_MATCHES_FAIL:
      return {
        ...state,
        matches: [],
        loading: false,
        error: action.payload,
        saveError: null,
      }

    case GET_MATCH:
      return {
        ...state,
        match: action.payload,
        stats: null,
        loading: false,
        error: null,
        saveError: null,
      }

    case GET_MATCH_REQUEST:
      return {
        ...state,
        match: null,
        stats: null,
        loading: true,
        error: null,
        saveError: null,
      }

    case GET_MATCH_FAIL:
      return {
        ...state,
        match: null,
        stats: null,
        loading: false,
        error: action.payload,
        saveError: null,
      }

    case SAVE_MATCH_FAIL:
      return {
        ...state,
        saveError: action.payload,
      }

    case SAVE_MATCH_STATS:
      return {
        ...state,
        stats: action.payload,
        loadingStats: false,
        saveStatsError: null,
      }

    case SAVE_MATCH_STATS_REQUEST:
      return {
        ...state,
        loadingStats: true,
        saveStatsError: null,
      }

    case SAVE_MATCH_STATS_FAIL:
      return {
        ...state,
        loadingStats: false,
        saveStatsError: action.payload,
      }

    default:
      return state
  }
}
