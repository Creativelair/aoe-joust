import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import PlayerStats from '../../components/aoe/players/playerStats'

export default function StatsPage() {
  return (
    <Layout>
      <Head>
        <title>AOEJoust | Stats</title>
      </Head>
      <NavBar />
      <Grid container spacing={2} justify="center">
        <PlayerStats />
      </Grid>
    </Layout>
  )
}
