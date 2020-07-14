import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import CivilizationsList from '../../components/aoe/civilizations/civilizationsList'

export default function Civilizations() {
  return (
    <Layout>
      <Head>
        <title>AOEJoust | Civilizations</title>
      </Head>
      <NavBar />
      <Grid container spacing={2} justify="center">
        <CivilizationsList />
      </Grid>
    </Layout>
  )
}
