import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signIn } from '../../redux/actions/authActions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import utilStyles from '../../styles/utils.module.scss'
import styles from './signIn.module.scss'

export default function SignIn() {
  const router = useRouter()

  const dispatch = useDispatch()
  const { user, loading, error } = useSelector(({ auth }) => auth)

  const { register, handleSubmit, errors } = useForm()
  const onSubmit = ({ email, password }, e) => {
    e.target.reset()
    dispatch(signIn(email, password))
  }

  if (user !== null) {
    router.push('/')
  }

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper className={styles.formContainer}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <Link href="/">
                <a>
                  <img src="/img/aoe-joust-white.png" alt="aoe-joust" className={utilStyles.miniLogo} />
                </a>
              </Link>
            </Grid>
            <Grid item xs={12} className={styles.fieldContainer}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  inputRef={register({
                    required: 'Required',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Invalid email',
                    }
                  })} />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={styles.fieldContainer}>
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  fullWidth
                  name="password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                  inputRef={register({ required: 'Required' })} />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<VpnKeyIcon />}
                type="submit">
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} className={styles.fieldContainer}>
              {loading && <CircularProgress />}
              {error && <Alert elevation={6} variant="filled" severity="error">{error.message}</Alert>}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
