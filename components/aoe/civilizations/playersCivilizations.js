import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { fetchCivilizations } from '../../../redux/actions/civilizationsActions'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import CheckIcon from '@material-ui/icons/Check'
import CivilizationPicker from './civilizationPicker'

export default function PlayersCivilizations({ players, matchStats, onChange }) {
  const dispatch = useDispatch()
  const { civilizations = [] } = useSelector(({ civilization }) => civilization)
  useEffect(() => {
    dispatch(fetchCivilizations())
  }, [])

  const { handleSubmit, control, errors } = useForm({
    defaultValues: matchStats.reduce((acc, playerStats) => {
      const civilization = civilizations.find(({ id }) => id === playerStats.civilizationId)
      if (!civilization) {
        return acc
      }

      return {
        ...acc,
        [`civ-${playerStats.playerId}`]: civilization,
      }
    }, {}),
  })
  const onSubmit = (data) => {
    onChange(
      Object.keys(data).reduce((acc, playerId) => ({
        ...acc,
        [playerId.slice(4)]: data[playerId].id,
      }), {})
    )
  }

  return (
    <Grid item xs={12}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justify="center">
          {
            players.map(player => (
              <Grid item xs={12} key={player.id}>
                <FormControl fullWidth error={errors[`civ-${player.id}`]}>
                  <InputLabel id={`civ-label-${player.id}`}>{player.name}</InputLabel>
                  <Controller
                    as={<CivilizationPicker labelId={`civ-label-${player.id}`} />}
                    name={`civ-${player.id}`}
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    disabled={!onChange}
                  />
                  {errors[`civ-${player.id}`] && <FormHelperText>Required</FormHelperText>}
                </FormControl>
              </Grid>
            ))
          }
          {onChange && <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              fullWidth
              type="submit">
            </Button>
          </Grid>}
        </Grid>
      </form>
    </Grid>
  )
}
