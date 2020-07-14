import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import styles from './team.module.scss'

const useStyles = makeStyles((theme) => ({
  primary: {
    '& > svg path': {
      fill: theme.palette.primary.main,
    },
  },
  secondary: {
    '& > svg path': {
      fill: theme.palette.secondary.main,
    },
  },
}))

export default function Team({ name, color = 'primary' }) {
  const classes = useStyles()
  const truncatedText = name.length > 13 ? `${name.substring(0, 13)}...` : name;

  return (
    <Box className={clsx(styles.container, classes[color])}>
      <svg viewBox="0 0 142 239">
        <path d="M4.537,1H137.463q-.5932,107.2319-1.1868,214.485-2.9667-2.37-5.9342-4.74l-13.0553-23.7c-1.4985,13.5522-5.6413,26.5323-14.242,33.18h-1.1869c.8846-7.8753,1.377-12.0664-3.56-16.59l-3.5606,9.48q-2.3733-5.9244-4.7473-11.85l-4.7474,1.185c-1.3053,13.4887-9.1442,28.8582-17.8027,35.55-2.2222-15.9442-10.0516-26.3714-17.8025-36.735l-4.7474,2.37q-2.3733,5.332-4.7473,10.665v-2.37l-2.3737-8.295H36.5816v16.59c-13.2374-7.0192-8.6477-19.4231-17.8026-29.625-1.7091,10.8229-6.5409,14.3539-14.242,18.96Z" />
        <text x="50%" y="40%">
          <tspan x="50%" y="45%">{name[0]}</tspan>
          <tspan x="50%" y="60%">{truncatedText}</tspan>
        </text>
      </svg>
    </Box>
  )
}
