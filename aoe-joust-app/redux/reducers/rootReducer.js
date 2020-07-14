import { combineReducers } from 'redux'
import { civilizationsReducer } from './civilizationsReducer'
import { mapsReducer } from './mapsReducer'
import { matchesReducer } from './matchesReducer'
import { playersReducer } from './playersReducer'
import { teamsReducer } from './teamsReducer'

const rootReducer = combineReducers({
  civilization: civilizationsReducer,
  map: mapsReducer,
  match: matchesReducer,
  player: playersReducer,
  team: teamsReducer,
})

export default rootReducer
