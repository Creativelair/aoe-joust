import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import MiniMenu from './menu/miniMenu'
import utilStyles from '../styles/utils.module.scss'

export default function NavBar() {
  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <Link href="/">
          <a>
            <img src="/img/aoe-joust-white.png" alt="aoe-joust" className={utilStyles.miniLogo} />
          </a>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <MiniMenu />
      </Grid>
    </Grid>
  )
}
