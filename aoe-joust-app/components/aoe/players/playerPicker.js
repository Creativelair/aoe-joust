import { useSelector } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default function PlayerPicker({ labelId, ...props }) {
  const { players = [] } = useSelector(({ player }) => player)

  return (
    <Select
      labelId={labelId}
      renderValue={(value) => value.name}
      {...props}>
      {
        (players || []).map(player => <MenuItem value={player} key={player.id}>{player.name}</MenuItem>)
      }
    </Select>
  )
}
