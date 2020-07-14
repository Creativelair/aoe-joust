import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import EventIcon from '@material-ui/icons/Event'
import Team from '../teams/team'
import styles from './match.module.scss'

export default function Match({ id, teamA, teamB, date, editable = false }) {
  const dispatch = useDispatch()

  const router = useRouter()

  const handleCreate = (e) => {
    e.preventDefault()
    router.push('/matches/[id]', `/matches/${id}`)
  }

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12}>
        <Team name={teamA} color="primary" />
        <Team name={teamB} color="secondary" />
      </Grid>
      <Grid item>
        <Chip
          label={date}
          icon={<EventIcon />}
        />
      </Grid>
      {editable && <Grid item>
        <IconButton aria-label="create" onClick={handleCreate}>
          <CreateIcon />
        </IconButton>
      </Grid>}
    </Grid>
  )
}
