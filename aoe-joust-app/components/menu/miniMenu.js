import Box from '@material-ui/core/Box'
import MenuItem from './menuItem'
import styles from './miniMenu.module.scss'

export default function MiniMenu() {
  return (
    <Box className={styles.container}>
      <MenuItem name="Civilizations" img="shield-civs.png" link="/civilizations" mini />
      <MenuItem name="Maps" img="shield-maps.png" link="/maps" mini />
      <MenuItem name="Teams" img="shield-teams.png" link="/teams" mini />
      <MenuItem name="Matches" img="shield-matches.png" link="/matches" mini />
      <MenuItem name="Stats" img="shield-stats.png" link="/stats" mini />
    </Box>
  )
}
