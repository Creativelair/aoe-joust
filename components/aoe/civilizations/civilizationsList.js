import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCivilizations } from '../../../redux/actions/civilizationsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Civilization from './civilization'

export default function CivilizationsList() {
  const dispatch = useDispatch()
  const { civilizations, loading, error } = useSelector(({ civilization }) => civilization)

  useEffect(() => {
    dispatch(fetchCivilizations())
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
        : civilizations.map(({ id, name, image }) => (
          <Grid item md={2} sm={3} xs={6} key={id}>
            <Grid container justify="center">
              <Civilization name={name} image={image} />
            </Grid>
          </Grid>
        ))}
    </>
  )
}
