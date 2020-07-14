import {
  GET_PLAYERS,
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_FAIL,
  GET_PLAYERS_STATS,
  GET_PLAYERS_STATS_REQUEST,
  GET_PLAYERS_STATS_FAIL,
} from '../actionTypes'

export const fetchPlayers = () => async dispatch => {
  try {
    dispatch({
      type: GET_PLAYERS_REQUEST,
    })

    const response = await fetch('/api/players')
    const players = await response.json()
    players.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

    dispatch({
      type: GET_PLAYERS,
      payload: players,
    })
  } catch (err) {
    dispatch({
      type: GET_PLAYERS_FAIL,
      payload: err.message,
    })
  }
}

export const fetchPlayerStats = (playerId) => async dispatch => {
  try {
    dispatch({
      type: GET_PLAYERS_STATS_REQUEST,
    })

    const response = await fetch(`/api/players/${playerId}/stats`)
    const playerStats = await response.json()

    dispatch({
      type: GET_PLAYERS_STATS,
      payload: playerStats,
    })
  } catch (err) {
    dispatch({
      type: GET_PLAYERS_STATS_FAIL,
      payload: err.message,
    })
  }
}
