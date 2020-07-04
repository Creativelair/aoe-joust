import { KEYS } from '../config/constants'
import mapsService from './maps'
import teamsService from './teams'
import matchesRepository from '../repositories/matches'

class MatchesService {
  async getMatches() {
    const matches = await matchesRepository.getMatches()
    return this.mapMatches(matches)
  }

  async getMatch(matchId) {
    const matches = await matchesRepository.getMatch(matchId)
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
      teams: playersData,
    }
  }

  async getPlayerStats(matchId, playerId) {
    const {
      CivilizationId,
      Statistics,
      MilitaryStatistics,
      EconomyStatistics,
      TechonologyStatistics,
      SocietyStatistics,
    } = await matchesRepository.getPlayerStats(matchId, playerId)
    return {
      id: matchId,
      playerId,
      civilizationId: CivilizationId,
      statistics: Statistics,
      militaryStatistics: MilitaryStatistics,
      economyStatistics: EconomyStatistics,
      techonologyStatistics: TechonologyStatistics,
      societyStatistics: SocietyStatistics,
    }
  }

  mapMatches(matches) {
    return Object.values(matches.reduce((acc, match) => {
      if (!acc.hasOwnProperty(match.MatchId)) {
        acc[match.MatchId] = {
          id: match.MatchId,
          mapId: '',
          teams: [],
        }
      }

      if (match.SK.startsWith(KEYS.METADATA)) {
        acc[match.MatchId].mapId = match.MapId
      } else if (match.SK.startsWith(KEYS.TEAM)) {
        acc[match.MatchId].teams.push(match.TeamId)
      }

      return acc
    }, {}))
  }

  async saveMatch(data) {
    return await matchesRepository.saveMatch(data)
  }

  async saveStats(data) {
    return await matchesRepository.saveStats(data)
  }
}

export default new MatchesService()
