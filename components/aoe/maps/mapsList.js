import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMaps } from '../../../redux/actions/mapsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Map from './map'

export default function MapsList() {
  const dispatch = useDispatch()
  const { maps, loading, error } = useSelector(({ map }) => map)

  useEffect(() => {
    dispatch(fetchMaps())
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
        : maps.map(({ id, name, image }) => (
          <Grid item md={3} sm={6} xs={12} key={id}>
            <Grid container justify="center">
              <Map name={name} image={image} />
            </Grid>
          </Grid>
        ))}
    </>
  )
}
