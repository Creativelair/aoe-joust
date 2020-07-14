import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatches } from '../../../redux/actions/matchesActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Match from './match'

export default function MatchesList() {
  const dispatch = useDispatch()
  const { matches, loading, error } = useSelector(({ match }) => match)

  useEffect(() => {
    dispatch(fetchMatches())
  }, [])

  if (error) {
    return (
      <Alert elevation={6} variant="filled" severity="error">{error}</Alert>
    )
  }

  return (
    <>
      {loading
        ? <CircularProgress />
        : matches.map(({ id, date, teams }) => (
          <Grid item xs={3} key={id}>
            <Match id={id} teamA={teams[0].name} teamB={teams[1].name} date={date} editable />
          </Grid>
        ))}
    </>
  )
}
