import StatsTable from './statsTable'

export default function EconomyStats({ players, matchStats, onChange }) {
  const columns = [
    { title: 'Player ID', field: 'playerId', hidden: true },
    { title: 'Player', field: 'player', editable: 'never' },
    { title: 'Food Collected', field: 'foodCollected', type: 'numeric' },
    { title: 'Wood Collected', field: 'woodCollected', type: 'numeric' },
    { title: 'Stone Collected', field: 'stoneCollected', type: 'numeric' },
    { title: 'Gold Collected', field: 'goldCollected', type: 'numeric' },
    { title: 'Trade Profit', field: 'tradeProfit', type: 'numeric' },
    { title: 'Tribute Sent', field: 'tributeSent', type: 'numeric' },
    { title: 'Tribute Received', field: 'tributeReceived', type: 'numeric' },
  ]

  const data = players.map(({ id, name }) => {
    const playerStats = matchStats.find(ms => ms.playerId === id)
    const stats = playerStats && playerStats.economyStatistics
      ? playerStats.economyStatistics
      : {
        foodCollected: 0,
        woodCollected: 0,
        stoneCollected: 0,
        goldCollected: 0,
        tradeProfit: 0,
        tributeSent: 0,
        tributeReceived: 0,
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
