import { GET_TEAMS, GET_TEAMS_REQUEST, GET_TEAMS_FAIL, SAVE_TEAM_FAIL } from '../actionTypes'

const initialState = {
  teams: [],
  team: {},
  loading: false,
  error: null,
  saveError: null,
}

export const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        loading: false,
        error: null,
        saveError: null,
      }

    case GET_TEAMS_REQUEST:
      return {
        ...state,
        teams: [],
        loading: true,
        error: null,
        saveError: null,
      }

    case GET_TEAMS_FAIL:
      return {
        ...state,
        teams: [],
        loading: false,
        error: action.payload,
        saveError: null,
      }

    case SAVE_TEAM_FAIL:
      return {
        ...state,
        saveError: action.payload,
      }

    default:
      return state
  }
}
