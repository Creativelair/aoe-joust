import StatsTable from './statsTable'

export default function SocietyStats({ players, matchStats, onChange }) {
  const columns = [
    { title: 'Player ID', field: 'playerId', hidden: true },
    { title: 'Player', field: 'player', editable: 'never' },
    { title: 'Total Wonders', field: 'totalWonders', type: 'numeric' },
    { title: 'Total Castles', field: 'totalCastles', type: 'numeric' },
    { title: 'Relics Captured', field: 'relicsCaptured', type: 'numeric' },
    { title: 'Relic Gold', field: 'relicGold', type: 'numeric' },
    { title: 'Villager High', field: 'villagerHigh', type: 'numeric' },
    { title: 'Survival To Finish', field: 'survivalToFinish', type: 'boolean' },
  ]

  const data = players.map(({ id, name }) => {
    const playerStats = matchStats.find(ms => ms.playerId === id)
    const stats = playerStats && playerStats.societyStatistics
      ? playerStats.societyStatistics
      : {
        totalWonders: 0,
        totalCastles: 0,
        relicsCaptured: 0,
        relicGold: 0,
        villagerHigh: 0,
        survivalToFinish: true,
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
