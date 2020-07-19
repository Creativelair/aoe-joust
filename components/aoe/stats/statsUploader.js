import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import LinearDeterminate from '../../general/linearDeterminate'
import StatsPlayerDialog from './statsPlayerDialog'
import styles from './statsUploader.module.scss'
import Tesseract from 'tesseract.js'

export default function StatsUploader({ data, onUpload }) {
  const [stats, setStats] = React.useState([])
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = React.useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleUploadClick = async (event) => {
    const file = event.target.files[0];
    if (!file) return

    setError(null)
    setProgress(0)

    const worker = Tesseract.createWorker({
      logger: m => {
        if (m.status === 'recognizing text')
          setProgress(m.progress * 100)
        return console.log(m)
      },
    })
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789:-',
    })
    const { data: { text } } = await worker.recognize(file)
    processText(text)
    await worker.terminate()

    setProgress(0)
  }

  const processText = (text) => {
    const cleanedText = text.replace(/^\s*[\r\n]/gm, '')
    const finalText = cleanedText.split("\n").filter(s => s !== '')

    if (finalText.length !== 4) {
      setError('Problem processing uploaded image, try again')
    } else {
      const splittedText = finalText.map(d => d.split(' '))
      setStats(splittedText)
      setOpenDialog(true)
    }
  }

  const handleDialogClose = (valid, orderedPlayers) => {
    setOpenDialog(false)

    if (valid) {
      const results = Object.keys(orderedPlayers).reduce((acc, idx) => ({
        ...acc,
        [orderedPlayers[idx]]: stats[idx],
      }), {})
      onUpload(results)
    }
  }

  return (
    <>
      <Grid item xs={12} sm={9} className={styles.progressContainer}>
        {progress > 0 && <LinearDeterminate progress={progress} />}
        {error && <Alert elevation={1} variant="filled" severity="error" className={styles.errorContainer}>{error}</Alert>}
      </Grid>
      <Grid item xs={12} sm={3} className={styles.inputContainer}>
        <FormControl>
          <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={handleUploadClick} />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CloudUploadIcon />}
              component="span">
              Upload
            </Button>
          </label>
        </FormControl>
      </Grid>
      <StatsPlayerDialog open={openDialog} data={data} onClose={handleDialogClose} />
    </>
  )
}
