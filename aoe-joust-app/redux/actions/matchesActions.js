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

export const fetchMatches = () => async dispatch => {
  try {
    dispatch({
      type: GET_MATCHES_REQUEST,
    })

    const response = await fetch('/api/matches')
    const matches = await response.json()
    matches.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0)

    dispatch({
      type: GET_MATCHES,
      payload: matches,
    })
  } catch (err) {
    dispatch({
      type: GET_MATCHES_FAIL,
      payload: err,
    })
  }
}

export const fetchMatch = (id) => async dispatch => {
  try {
    dispatch({
      type: GET_MATCH_REQUEST,
    })

    const response = await fetch(`/api/matches/${id}`)
    const match = await response.json()

    dispatch(dispatch({
      type: GET_MATCH,
      payload: match,
    }))
  } catch (err) {
    dispatch({
      type: GET_MATCH_FAIL,
      payload: err,
    })
  }
}

export const saveMatch = (match) => async dispatch => {
  try {
    const response = await fetch('/api/matches', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(match),
    })

    if (response.ok) {
      dispatch(fetchMatches())
    } else {
      dispatch({
        type: SAVE_MATCH_FAIL,
        payload: 'Error saving match',
      })
    }
  } catch (err) {
    dispatch({
      type: SAVE_MATCH_FAIL,
      payload: err.message,
    })
  }
}

export const saveMatchStats = (matchId, stats) => async dispatch => {
  try {
    dispatch({
      type: SAVE_MATCH_STATS_REQUEST,
    })

    const response = await fetch(`/api/matches/${matchId}/stats`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(stats),
    })

    if (response.ok) {
      dispatch(dispatch({
        type: SAVE_MATCH_STATS,
        payload: stats,
      }))
    } else {
      dispatch({
        type: SAVE_MATCH_STATS_FAIL,
        payload: 'Error saving match stats',
      })
    }
  } catch (err) {
    dispatch({
      type: SAVE_MATCH_STATS_FAIL,
      payload: err.message,
    })
  }
}
