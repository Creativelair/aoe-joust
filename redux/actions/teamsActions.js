import { GET_TEAMS, GET_TEAMS_REQUEST, GET_TEAMS_FAIL, SAVE_TEAM_FAIL } from '../actionTypes'

export const fetchTeams = () => async dispatch => {
  try {
    dispatch({
      type: GET_TEAMS_REQUEST,
    })

    const response = await fetch('/api/teams')
    const teams = await response.json()
    teams.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

    dispatch({
      type: GET_TEAMS,
      payload: teams,
    })
  } catch (err) {
    dispatch({
      type: GET_TEAMS_FAIL,
      payload: err.message,
    })
  }
}

export const saveTeam = (team) => async dispatch => {
  try {
    const response = await fetch('/api/teams', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(team),
    })

    if (response.ok) {
      dispatch(fetchTeams())
    } else {
      dispatch({
        type: SAVE_TEAM_FAIL,
        payload: 'Error saving team',
      })
    }
  } catch (err) {
    dispatch({
      type: SAVE_TEAM_FAIL,
      payload: err.message,
    })
  }
}
