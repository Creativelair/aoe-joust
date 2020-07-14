import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { saveTeam } from '../../../redux/actions/teamsActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import styles from './teamsForm.module.scss'

export default function TeamsForm() {
  const dispatch = useDispatch()
  const { saveError } = useSelector(({ team }) => team)
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = ({ name, playerA, playerB }, e) => {
    e.target.reset()
    dispatch(saveTeam({
      name,
      players: [
        {
          name: playerA,
        },
        {
          name: playerB,
        },
      ],
    }))
  }

  return (
    <Grid item xs={12}>
      <Paper className={styles.formContainer}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                error={!!errors.name}
                helperText={errors.name && 'Required'}
                inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Player One"
                fullWidth
                name="playerA"
                error={!!errors.playerA}
                helperText={errors.playerA && 'Required'}
                inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Player Two"
                fullWidth
                name="playerB"
                error={!!errors.playerB}
                helperText={errors.playerB && 'Required'}
                inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={1}>
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
