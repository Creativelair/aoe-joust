import clsx from 'clsx'
import Link from 'next/link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import styles from './menuItem.module.scss'

export default function MenuItem({ name, img, link, mini = false }) {
  const classes = clsx({
    [styles.menuItemContainer]: true,
    [styles.menuItemContainerMini]: mini,
  });

  return (
    <Link href={link}>
      <a>
        <Box className={classes}>
          <img src={`/img/${img}`} alt="shield" className={styles.shield} />
          <Typography variant="h6">
            {name}
          </Typography>
        </Box>
      </a>
    </Link>
  )
}
