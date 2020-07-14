import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import TeamsForm from '../../components/aoe/teams/teamsForm'
import TeamsList from '../../components/aoe/teams/teamsList'

export default function Teams() {
  return (
    <Layout>
      <Head>
        <title>AOEJoust | Teams</title>
      </Head>
      <NavBar />
      <Grid container spacing={2} justify="center">
        <TeamsForm />
        <TeamsList />
      </Grid>
    </Layout>
  )
}
