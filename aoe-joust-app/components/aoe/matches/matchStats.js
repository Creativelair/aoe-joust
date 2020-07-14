import { useSelector, useDispatch } from 'react-redux'
import { saveMatchStats } from '../../../redux/actions/matchesActions'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import Stats from '../stats/stats'
import Match from './match'
import styles from './matchStats.module.scss'

export default function MatchStats({ match }) {
  const players = match.teams.flatMap(team => team.players)

  const dispatch = useDispatch()
  const { stats, loadingStats, saveStatsError } = useSelector(({ match }) => match)

  const handleSave = (rawStats) => {
    const stats = {
      stats: Object.keys(rawStats).map(playerId => {
        return {
          playerId,
          ...rawStats[playerId],
        }
      })
    }
    dispatch(saveMatchStats(match.id, stats))
  }

  return (
    <Box>
      <Match id={match.id} teamA={match.teams[0].name} teamB={match.teams[1].name} date={match.date} />
      <Box className={styles.messagesContainer}>
        {loadingStats && <CircularProgress className={styles.loading} />}
        {stats && <Alert elevation={6} variant="filled" severity="success">Stats saved successfully</Alert>}
        {saveStatsError && <Alert elevation={6} variant="filled" severity="error">{saveStatsError}</Alert>}
      </Box>
      <Box className={styles.statsContainer}>
        <Stats players={players} matchStats={match.stats} onSave={handleSave} />
      </Box>
    </Box>
  )
}
