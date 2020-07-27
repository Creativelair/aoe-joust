import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import SaveIcon from '@material-ui/icons/Save'
import styles from './statsPlayerDialog.module.scss'

const StatsPlayerSelect = ({ idx, data, onChange }) => (
  <Select
    labelId={`stats-player-label-${idx}`}
    id={`stats-player-${idx}`}
    onChange={(e) => onChange(idx, e.target.value)}>
    {data.map(({ playerId, player }) => <MenuItem value={playerId}>{player}</MenuItem>)}
  </Select>
)

export default function StatsPlayerDialog({ open, data, onClose }) {
  const [players, setPlayers] = React.useState({})

  const handleClose = (valid) => {
    onClose(valid, players)
  }

  const handleChange = (idx, playerId) => {
    setPlayers({
      ...players,
      [idx]: playerId,
    })
  }

  const isDisabled = () => {
    return Object.keys(players).length !== 4
  }

  return (
    <Dialog aria-labelledby="stats-player-dialog-title" open={open} onClose={() => handleClose(false)}>
      <DialogTitle id="stats-player-title">Players Order</DialogTitle>
      <Grid container className={styles.dialogContainer}>
        {[0, 1, 2, 3].map(idx => (
          <Grid item xs={12} className={styles.selectContainer}>
            <FormControl fullWidth>
              <InputLabel id={`stats-player-label-${idx}`}>Player {`${idx + 1}`}</InputLabel>
              <StatsPlayerSelect idx={idx} data={data} onChange={handleChange} />
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12} className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            fullWidth
            disabled={isDisabled()}
            onClick={handleClose}>
            Save
        </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}
