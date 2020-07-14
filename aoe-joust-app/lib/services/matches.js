import { KEYS } from '../config/constants'
import mapsService from './maps'
import teamsService from './teams'
import StatsService from './stats'
import matchesRepository from '../repositories/matches'

class MatchesService extends StatsService {
  async getMatches() {
    const matches = await matchesRepository.getMatches()
    const teams = await teamsService.getTeams()

    const mappedMatches = this.mapMatches(matches)
    const mappedTeams = teams.reduce((acc, team) => ({ ...acc, [team.id]: team }), {})

    return mappedMatches.map(match => ({
      id: match.id,
      mapId: match.mapId,
      date: match.date,
      teams: match.teams.map(team => mappedTeams[team]),
    }))
  }

  async getMatch(matchId) {
    const [matches, stats] = await Promise.all([
      matchesRepository.getMatch(matchId),
      this.getStats(matchId),
    ])
    if (!matches.length) {
      return null
    }

    const [mappedMatch] = this.mapMatches(matches)
    const [mapData, ...playersData] = await Promise.all([
      mapsService.getMap(mappedMatch.mapId),
      ...mappedMatch.teams.map(team => teamsService.getTeam(team)),
    ])

    return {
      id: mappedMatch.id,
      map: mapData,
      date: mappedMatch.date,
      teams: playersData,
      stats: stats.stats,
    }
  }

  mapMatches(matches) {
    return Object.values(matches.reduce((acc, match) => {
      if (!acc.hasOwnProperty(match.MatchId)) {
        acc[match.MatchId] = {
          id: match.MatchId,
          mapId: '',
          date: '',
          teams: [],
        }
      }

      if (match.SK.startsWith(KEYS.METADATA)) {
        acc[match.MatchId].mapId = match.MapId
        acc[match.MatchId].date = match.Date
      } else if (match.SK.startsWith(KEYS.TEAM)) {
        acc[match.MatchId].teams.push(match.TeamId)
      }

      return acc
    }, {}))
  }

  async getStats(matchId) {
    const stats = await matchesRepository.getStats(matchId)
    return {
      stats: this.mapStats(stats),
    }
  }

  async getPlayerStats(matchId, playerId) {
    const playerStats = await matchesRepository.getPlayerStats(matchId, playerId)
    return this.mapStats([playerStats])[0]
  }

  async saveMatch(data) {
    return await matchesRepository.saveMatch(data)
  }

  async saveStats(data) {
    return await matchesRepository.saveStats(data)
  }
}

export default new MatchesService()
