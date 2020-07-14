import { useSelector } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default function MapPicker({ labelId, ...props }) {
  const { maps = [] } = useSelector(({ map }) => map)

  return (
    <Select
      labelId={labelId}
      renderValue={(value) => value.name}
      {...props}>
      {
        (maps || []).map(map => <MenuItem value={map} key={map.id}>{map.name}</MenuItem>)
      }
    </Select>
  )
}
