import { GET_CIVILIZATIONS, GET_CIVILIZATIONS_REQUEST, GET_CIVILIZATIONS_FAIL } from '../actionTypes'

export const fetchCivilizations = () => async dispatch => {
  try {
    dispatch({
      type: GET_CIVILIZATIONS_REQUEST,
    })

    const response = await fetch('/api/civilizations')
    const civilizations = await response.json()
    civilizations.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

    dispatch({
      type: GET_CIVILIZATIONS,
      payload: civilizations,
    })
  } catch (err) {
    dispatch({
      type: GET_CIVILIZATIONS_FAIL,
      payload: err,
    })
  }
}
