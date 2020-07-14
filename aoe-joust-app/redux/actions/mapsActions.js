import { GET_MAPS, GET_MAPS_REQUEST, GET_MAPS_FAIL } from '../actionTypes'

export const fetchMaps = () => async dispatch => {
  try {
    dispatch({
      type: GET_MAPS_REQUEST,
    })

    const response = await fetch('/api/maps')
    const maps = await response.json()
    maps.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

    dispatch({
      type: GET_MAPS,
      payload: maps,
    })
  } catch (err) {
    dispatch({
      type: GET_MAPS_FAIL,
      payload: err,
    })
  }
}
