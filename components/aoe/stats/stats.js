import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExploreIcon from '@material-ui/icons/Explore'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import PeopleIcon from '@material-ui/icons/People'
import SaveIcon from '@material-ui/icons/Save'
import SecurityIcon from '@material-ui/icons/Security';
import WifiIcon from '@material-ui/icons/Wifi'
import TabPanel from '../../general/tabPanel'
import GeneralStats from './generalStats'
import MilitaryStats from './militaryStats'
import EconomyStats from './economyStats'
import TechonologyStats from './techonologyStats'
import SocietyStats from './societyStats'
import styles from './stats.module.scss'
import PlayersCivilizations from '../civilizations/playersCivilizations'

export default function Stats({ players, matchStats, onSave }) {
  const [value, setValue] = React.useState(0)
  const [stats, setStats] = React.useState(matchStats.reduce((acc, ms) => ({
    ...acc,
    [ms.playerId]: ms,
  }), {}))

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const handleStatsChange = (category, { playerId, player, ...newStats }) => {
    setStats({
      ...stats,
      [playerId]: {
        ...(stats[playerId] || {}),
        [category]: newStats,
      }
    })
  }

  const handleCivsChange = (civilizations) => {
    setStats({
      ...stats,
      ...Object.keys(civilizations).reduce((acc, playerId) => ({
        ...acc,
        [playerId]: {
          ...(stats[playerId] || {}),
          civilizationId: civilizations[playerId],
        },
      }), {})
    })
  }

  const handleSaveClick = (e) => {
    e.preventDefault()
    onSave(stats)
  }

  const canSaveStats = () => {
    return players.every(({ id }) => stats.hasOwnProperty(id)) && Object.keys(stats).every(playerId => {
      const playerStats = stats[playerId]
      return [
        'civilizationId',
        'statistics',
        'militaryStatistics',
        'economyStatistics',
        'technologyStatistics',
        'societyStatistics',
      ].every(prop => playerStats.hasOwnProperty(prop))
    });
  }

  return (
    <Paper className={styles.container}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered>
          <Tab label="Civilizations" icon={<ExploreIcon />} />
          <Tab label="General" icon={<EqualizerIcon />} />
          <Tab label="Military" icon={<SecurityIcon />} />
          <Tab label="Economy" icon={<MonetizationOnIcon />} />
          <Tab label="Technology" icon={<WifiIcon />} />
          <Tab label="Society" icon={<PeopleIcon />} />
        </Tabs>
      </AppBar>
      <Box>
        <TabPanel value={value} index={0}>
          <PlayersCivilizations players={players} matchStats={matchStats} onChange={onSave ? handleCivsChange : null} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GeneralStats players={players} matchStats={matchStats} onChange={onSave ? data => handleStatsChange('statistics', data) : null} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MilitaryStats players={players} matchStats={matchStats} onChange={onSave ? data => handleStatsChange('militaryStatistics', data) : null} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EconomyStats players={players} matchStats={matchStats} onChange={onSave ? data => handleStatsChange('economyStatistics', data) : null} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TechonologyStats players={players} matchStats={matchStats} onChange={onSave ? data => handleStatsChange('technologyStatistics', data) : null} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <SocietyStats players={players} matchStats={matchStats} onChange={onSave ? data => handleStatsChange('societyStatistics', data) : null} />
        </TabPanel>
      </Box>
      {onSave && <Fab color="primary" aria-label="save" className={styles.mainButton} onClick={handleSaveClick} disabled={!canSaveStats()}>
        <SaveIcon />
      </Fab>}
    </Paper>
  )
}
