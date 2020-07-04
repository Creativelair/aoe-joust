import playersRepository from '../repositories/players'

class PlayersService {
  async getTeamPlayers(teamId) {
    const players = await playersRepository.getTeamPlayers(teamId)
    return players.map(player => ({
      id: player.PlayerId,
      name: player.Name,
    }))
  }

  async getPlayer(playerId) {
    const player = await playersRepository.getPlayer(playerId)
    return player !== null ? {
      id: player.PlayerId,
      name: player.Name,
    } : null
  }
}

export default new PlayersService()
