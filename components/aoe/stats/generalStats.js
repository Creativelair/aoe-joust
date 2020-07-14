import StatsTable from './statsTable'

export default function GeneralStats({ players, matchStats, onChange }) {
  const columns = [
    { title: 'Player ID', field: 'playerId', hidden: true },
    { title: 'Player', field: 'player', editable: 'never' },
    { title: 'Military', field: 'military', type: 'numeric' },
    { title: 'Economy', field: 'economy', type: 'numeric' },
    { title: 'Technology', field: 'technology', type: 'numeric' },
    { title: 'Society', field: 'society', type: 'numeric' },
    { title: 'Total Score', field: 'totalScore', type: 'numeric' },
  ]

  const data = players.map(({ id, name }) => {
    const playerStats = matchStats.find(ms => ms.playerId === id)
    const stats = playerStats && playerStats.statistics
      ? playerStats.statistics
      : {
        military: 0,
        economy: 0,
        technology: 0,
        society: 0,
        totalScore: 0,
      }

    return {
      playerId: id,
      player: name,
      ...stats,
    }
  })

  return (
    <StatsTable columns={columns} data={data} onChange={onChange} />
  )
}
