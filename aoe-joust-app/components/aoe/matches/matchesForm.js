import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { fetchMaps } from '../../../redux/actions/mapsActions'
import { saveMatch } from '../../../redux/actions/matchesActions'
import { fetchTeams } from '../../../redux/actions/teamsActions'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Alert from '@material-ui/lab/Alert'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MapPicker from '../maps/mapPicker'
import TeamPicker from '../teams/teamPicker'
import { format as dateFormat } from 'date-fns'
import * as Joi from '@hapi/joi'
import styles from './matchesForm.module.scss'

const validationSchema = Joi.object({
  date: Joi.date().required(),
  map: Joi.object().required(),
  teamA: Joi.object().required(),
  teamB: Joi.object().required(),
})

export default function MatchesForm() {
  const dispatch = useDispatch()
  const { saveError } = useSelector(({ match }) => match)
  useEffect(() => {
    dispatch(fetchMaps())
  }, [])
  useEffect(() => {
    dispatch(fetchTeams())
  }, [])

  const { handleSubmit, control, errors, reset } = useForm({
    resolver: async data => {
      const { error, value: values } = validationSchema.validate(data, {
        abortEarly: false
      })

      const errors = error
        ? error.details.reduce((previous, currentError) => {
          return {
            ...previous,
            [currentError.path[0]]: currentError
          }
        }, {})
        : {}

      if (values.teamA !== '' & values.teamB !== '' && values.teamA === values.teamB) {
        errors.teams = true
      }

      return {
        values: error ? {} : values,
        errors,
      }
    }
  })
  const onSubmit = (data, e) => {
    e.target.reset()
    reset()
    dispatch(saveMatch({
      mapId: data.map.id,
      date: dateFormat(data.date, 'yyyy-MM-dd'),
      teams: [
        data.teamA.id,
        data.teamB.id,
      ]
    }))
  }

  return (
    <Grid item xs={12}>
      <Paper className={styles.formContainer}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={2}>
              <Controller
                as={
                  <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="none"
                    label="Date"
                  />
                }
                name="date"
                control={control}
                defaultValue={new Date()}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth error={errors.map}>
                <InputLabel id="map-label">Map</InputLabel>
                <Controller
                  as={<MapPicker labelId="map-label" />}
                  name="map"
                  control={control}
                  defaultValue=""
                />
                {errors.map && <FormHelperText>Required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth error={errors.teamA}>
                <InputLabel id="team-a-label">Team One</InputLabel>
                <Controller
                  as={<TeamPicker labelId="team-a-label" />}
                  name="teamA"
                  control={control}
                  defaultValue=""
                />
                {errors.teamA && <FormHelperText>Required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth error={errors.teamB || errors.teams}>
                <InputLabel id="team-b-label">Team Two</InputLabel>
                <Controller
                  as={<TeamPicker labelId="team-b-label" />}
                  name="teamB"
                  control={control}
                  defaultValue=""
                />
                {errors.teamB && <FormHelperText>Required</FormHelperText>}
                {errors.teams && <FormHelperText>Teams should be different!</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={2} className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                fullWidth
                type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {saveError && <Alert elevation={6} variant="filled" severity="error" className={styles.errorAlert}>{saveError}</Alert>}
    </Grid>
  )
}
