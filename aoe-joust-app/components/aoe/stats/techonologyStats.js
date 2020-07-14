import StatsTable from './statsTable'

export default function TechonologyStats({ players, matchStats, onChange }) {
  const columns = [
    { title: 'Player ID', field: 'playerId', hidden: true },
    { title: 'Player', field: 'player', editable: 'never' },
    { title: 'Feudal Age', field: 'feudalAge' },
    { title: 'Castle Age', field: 'castleAge' },
    { title: 'Imperial Age', field: 'imperialAge' },
    { title: 'Map Explored', field: 'mapExplored', type: 'numeric' },
    { title: 'Research Count', field: 'researchCount', type: 'numeric' },
    { title: 'Research Percent', field: 'researchPercent', type: 'numeric' },
  ]

  const data = players.map(({ id, name }) => {
    const playerStats = matchStats.find(ms => ms.playerId === id)
    const stats = playerStats && playerStats.technologyStatistics
      ? playerStats.technologyStatistics
      : {
        feudalAge: null,
        castleAge: null,
        imperialAge: null,
        mapExplored: 0,
        researchCount: 0,
        researchPercent: 0,
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
