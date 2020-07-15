import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Profile from '../auth/profile'
import styles from './topMenu.module.scss'

export default function TopMenu() {
  return (
    <div className={styles.container}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div className={styles.emptySpace}></div>
          <Profile />
        </Toolbar>
      </AppBar>
    </div>
  )
}
