import StatsTable from './statsTable'

export default function MilitaryStats({ players, matchStats, onChange }) {
  const columns = [
    { title: 'Player ID', field: 'playerId', hidden: true },
    { title: 'Player', field: 'player', editable: 'never' },
    { title: 'Units Killed', field: 'unitsKilled', type: 'numeric' },
    { title: 'Units Lost', field: 'unitsLost', type: 'numeric' },
    { title: 'Buildings Razed', field: 'buildingsRazed', type: 'numeric' },
    { title: 'Buildings Lost', field: 'buildingsLost', type: 'numeric' },
    { title: 'Units Converted', field: 'unitsConverted', type: 'numeric' },
    { title: 'Largest Army', field: 'largestArmy', type: 'numeric' },
  ]

  const data = players.map(({ id, name }) => {
    const playerStats = matchStats.find(ms => ms.playerId === id)
    const stats = playerStats && playerStats.militaryStatistics
      ? playerStats.militaryStatistics
      : {
        unitsKilled: 0,
        unitsLost: 0,
        buildingsRazed: 0,
        buildingsLost: 0,
        unitsConverted: 0,
        largestArmy: 0,
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
