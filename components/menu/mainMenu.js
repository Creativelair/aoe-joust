import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MenuItem from './menuItem'
import styles from './mainMenu.module.scss'

export default function MainMenu() {
  const shieldsSpacing = 10;

  return (
    <Box className={styles.container}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={shieldsSpacing} className={styles.menuContainer}>
          <Grid item>
            <MenuItem name="Civilizations" img="shield-civs.png" link="/civilizations" />
          </Grid>
          <Grid item>
            <MenuItem name="Maps" img="shield-maps.png" link="/maps" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={shieldsSpacing} className={styles.menuContainer}>
          <Grid item>
            <MenuItem name="Teams" img="shield-teams.png" link="/teams" />
          </Grid>
          <Grid item>
            <MenuItem name="Matches" img="shield-matches.png" link="/matches" />
          </Grid>
          <Grid item>
            <MenuItem name="Stats" img="shield-stats.png" link="/stats" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
