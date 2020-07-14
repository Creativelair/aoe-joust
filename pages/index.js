import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/layout'
import MainMenu from '../components/menu/mainMenu'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>AOEJoust</title>
      </Head>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <img src="/img/aoe-joust-light.png" alt="aoe-joust" className={utilStyles.logo} />
        </Grid>
        <MainMenu />
      </Grid>
    </Layout>
  )
}
