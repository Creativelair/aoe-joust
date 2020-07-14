import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../components/layout'
import NavBar from '../../components/navBar'
import MapsList from '../../components/aoe/maps/mapsList'

export default function Maps() {
  return (
    <Layout>
      <Head>
        <title>AOEJoust | Maps</title>
      </Head>
      <NavBar />
      <Grid container spacing={2} justify="center">
        <MapsList />
      </Grid>
    </Layout>
  )
}
