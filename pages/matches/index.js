import { useSelector } from 'react-redux'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import MatchesForm from '../../components/aoe/matches/matchesForm'
import MatchesList from '../../components/aoe/matches/matchesList'

export default function Matches() {
  const { user } = useSelector(({ auth }) => auth)

  return (
    <Layout>
      <Head>
        <title>AOEJoust | Matches</title>
      </Head>
      <NavBar />
      <Grid container spacing={2} justify="center">
        {user !== null && <MatchesForm />}
        <MatchesList detailed editable={user !== null} />
      </Grid>
    </Layout>
  )
}
