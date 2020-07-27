import LinearProgress from '@material-ui/core/LinearProgress'

export default function LinearDeterminate({ progress }) {
  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
