import { KEYS } from '../config/constants'
import playersService from './players'
import teamsRepository from '../repositories/teams'

class TeamsService {
  async getTeams() {
    const teams = await teamsRepository.getTeams()
    return this.mapTeams(teams)
  }

  async getTeam(teamId) {
    const teams = await teamsRepository.getTeam(teamId)
    if (!teams.length) {
      return null
    }

    const [mappedTeam] = this.mapTeams(teams)
    const players = await Promise.all(mappedTeam.players.map(player => playersService.getPlayer(player)));

    return {
      id: mappedTeam.id,
      name: mappedTeam.name,
      players,
    }
  }

  mapTeams(teams) {
    return Object.values(teams.reduce((acc, team) => {
      if (!acc.hasOwnProperty(team.TeamId)) {
        acc[team.TeamId] = {
          id: team.TeamId,
          name: '',
          players: [],
        }
      }

      if (team.SK.startsWith(KEYS.METADATA)) {
        acc[team.TeamId].name = team.Name
      } else if (team.SK.startsWith(KEYS.PLAYER)) {
        acc[team.TeamId].players.push(team.PlayerId)
      }

      return acc
    }, {}))
  }

  async saveTeam(data) {
    return await teamsRepository.saveTeam(data)
  }
}

export default new TeamsService()
