import _ from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlayers, fetchPlayerStats } from '../../../redux/actions/playersActions'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Alert from '@material-ui/lab/Alert'
import GetAppIcon from '@material-ui/icons/GetApp'
import Stats from '../stats/stats'
import PlayerPicker from './playerPicker'
import FileSaver from 'file-saver'
import styles from './playerStats.module.scss'

export default function PlayerStats() {
  const [players, setPlayers] = React.useState([])

  const dispatch = useDispatch()
  const { user } = useSelector(({ auth }) => auth)
  const { loading, error, playerStats, loadingStats, errorStats } = useSelector(({ player }) => player)
  useEffect(() => {
    dispatch(fetchPlayers())
  }, [])

  const handleChange = (event) => {
    const player = event.target.value
    dispatch(fetchPlayerStats(player.id))
    setPlayers([player])
  }

  const handleExport = (event) => {
    event.preventDefault()

    const fields = {
      civilization: 'civilizationName',
      largestArmy: 'militaryStatistics.largestArmy',
      villagerHigh: 'societyStatistics.villagerHigh',
      feudalAge: 'technologyStatistics.feudalAge',
      castleAge: 'technologyStatistics.castleAge',
      imperialAge: 'technologyStatistics.imperialAge',
      foodCollected: 'economyStatistics.foodCollected',
      woodCollected: 'economyStatistics.woodCollected',
      goldCollected: 'economyStatistics.goldCollected',
      stoneCollected: 'economyStatistics.stoneCollected',
    }

    Object.keys(fields).forEach(field => {
      const blob = new Blob([_.get(playerStats, fields[field], '-') || '-'], { type: "text/plain;charset=utf-8" })
      FileSaver.saveAs(blob, `${field}.txt`)
    })
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper className={styles.formContainer}>
          <Grid container spacing={2} justify="center">
            {loading
              ? <CircularProgress />
              : (
                <>
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <InputLabel id="player">Player</InputLabel>
                      <PlayerPicker labelId="player" onChange={handleChange} />
                    </FormControl>
                  </Grid>
                  {user && <Grid item xs={2} className={styles.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<GetAppIcon />}
                      fullWidth
                      type="submit"
                      disabled={!playerStats}
                      onClick={handleExport}>
                      Export
                    </Button>
                  </Grid>}
                </>
              )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {error && <Alert elevation={6} variant="filled" severity="error">{error}</Alert>}
        {errorStats && <Alert elevation={6} variant="filled" severity="error">{errorStats}</Alert>}
      </Grid>
      <Grid item xs={12}>
        {loadingStats && <CircularProgress />}
        {playerStats && <Stats players={players} matchStats={[playerStats]} />}
      </Grid>
    </>
  )
}
