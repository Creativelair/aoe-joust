import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatch } from '../../redux/actions/matchesActions'
import { useRouter } from 'next/router'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import MatchStats from '../../components/aoe/matches/matchStats'
import styles from './[id].module.scss'

export default function MatchDetail() {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const { user } = useSelector(({ auth }) => auth)
  const { match, loading, error } = useSelector(({ match }) => match)

  useEffect(() => {
    dispatch(fetchMatch(id))
  }, [])

  if (error) {
    return (
      <Alert elevation={6} variant="filled" severity="error">{error}</Alert>
    )
  }

  return (
    <Layout>
      <Head>
        <title>AOEJoust | Match detail</title>
      </Head>
      <NavBar />
      <Grid container>
        <Grid item xs={12}>
          {loading
            ? <CircularProgress className={styles.loading} />
            : match && <MatchStats match={match} editable={user !== null} />
          }
        </Grid>
      </Grid>
    </Layout>
  )
}
