import Typography from '@material-ui/core/Typography'
import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography variant="overline" display="block" gutterBottom>
        AOEJoust // Age of Empires II Tournament Management
      </Typography>
    </footer>
  );
}
