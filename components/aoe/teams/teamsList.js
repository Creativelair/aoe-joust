import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTeams } from '../../../redux/actions/teamsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Team from './team'

export default function TeamsList() {
  const dispatch = useDispatch()
  const { teams, loading, error } = useSelector(({ team }) => team)

  useEffect(() => {
    dispatch(fetchTeams())
  }, [])

  if (error) {
    return (
      <Grid item xs={12}>
        <Alert elevation={6} variant="filled" severity="error">{error}</Alert>
      </Grid>
    )
  }

  return (
    <>
      {loading
        ? <CircularProgress />
        : teams.map(({ id, name }) => (
          <Grid item xs={3} key={id}>
            <Grid container justify="center">
              <Team name={name} color="secondary" />
            </Grid>
          </Grid>
        ))}
    </>
  )
}
