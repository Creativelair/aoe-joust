import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import styles from './map.module.scss'

export default function Map({ name, image }) {
  return (
    <Box className={styles.container}>
      <img src={`/img/${image}`} alt={name} />
      <Typography variant="h6" display="block" gutterBottom>
        {name}
      </Typography>
    </Box>
  )
}
