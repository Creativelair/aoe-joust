import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import MiniMenu from './menu/miniMenu'
import utilStyles from '../styles/utils.module.scss'

export default function NavBar() {
  return (
    <Grid container justify="center">
      <Grid item md={6} xs={12}>
        <Link href="/">
          <a>
            <img src="/img/aoe-joust-white.png" alt="aoe-joust" className={utilStyles.miniLogo} />
          </a>
        </Link>
      </Grid>
      <Grid item md={6} xs={12}>
        <MiniMenu />
      </Grid>
    </Grid>
  )
}
