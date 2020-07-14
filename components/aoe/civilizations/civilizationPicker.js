import { useSelector } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default function CivilizationPicker({ labelId, ...props }) {
  const { civilizations = [] } = useSelector(({ civilization }) => civilization)

  return (
    <Select
      labelId={labelId}
      renderValue={(value) => value.name}
      {...props}>
      {
        (civilizations || []).map(civ => <MenuItem value={civ} key={civ.id}>{civ.name}</MenuItem>)
      }
    </Select>
  )
}
