import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import MatchesForm from '../../components/aoe/matches/matchesForm'
import MatchesList from '../../components/aoe/matches/matchesList'

export default function Matches() {
  return (
    <Layout>
      <Head>
        <title>AOEJoust | Matches</title>
      </Head>
      <NavBar />
      <Grid container spacing={2} justify="center">
        <MatchesForm />
        <MatchesList />
      </Grid>
    </Layout>
  )
}
