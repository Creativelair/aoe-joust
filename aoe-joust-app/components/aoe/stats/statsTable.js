import MaterialTable from 'material-table'

export default function StatsTable({ columns, data, onChange }) {
  const [state, setState] = React.useState({ columns, data });

  return (
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
                });
              }
            }, 600)
          }),
      }}
    />
  )
}
