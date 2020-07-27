import dynamic from 'next/dynamic'
import Grid from '@material-ui/core/Grid'
import StatsUploader from './statsUploader'
import styles from './statsTable.module.scss'

const MaterialTable = dynamic(() => import('material-table'), { ssr: false })

export default function StatsTable({ columns, data, onChange }) {
  const [state, setState] = React.useState({ columns, data });

  const fields = columns.slice(2).map(t => t.field)
  const handleUpload = (uploadedData) => {
    setState((prevState) => {
      const data = [...prevState.data].map((d) => {
        const uploadedItems = uploadedData[d.playerId]
        if (!uploadedItems || !uploadedItems.length) {
          return d
        }

        const newData = uploadedItems.reduce((acc, item, idx) => {
          if (idx >= fields.length) {
            return acc;
          }
          return { ...acc, [fields[idx]]: item };
        }, {})

        return {
          ...d,
          ...newData,
        }
      })
      onChange(data)
      return { ...prevState, data }
    })
  }

  return (
    <Grid container>
      <StatsUploader data={state.data} onUpload={handleUpload} />
      <Grid item xs={12} className={styles.tableContainer}>
        <MaterialTable
          columns={state.columns}
          data={state.data}
          options={{
            search: false,
            showTitle: false,
            toolbar: false,
          }}
          editable={onChange && {
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                  if (oldData) {
                    setState((prevState) => {
                      onChange(newData)
                      const data = [...prevState.data]
                      data[data.indexOf(oldData)] = newData
                      return { ...prevState, data }
                    })
                  }
                }, 600)
              }),
          }}
        />
      </Grid>
    </Grid>
  )
}
