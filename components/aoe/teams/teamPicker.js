import { useSelector } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default function TeamPicker({ labelId, ...props }) {
  const { teams = [] } = useSelector(({ team }) => team)

  return (
    <Select
      labelId={labelId}
      renderValue={(value) => value.name}
      {...props}>
      {
        (teams || []).map(team => <MenuItem value={team} key={team.id}>{team.name}</MenuItem>)
      }
    </Select>
  )
}
