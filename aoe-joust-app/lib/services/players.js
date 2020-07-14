import * as _ from 'lodash'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import * as ss from 'simple-statistics'
import civilizationsService from './civilizations'
import StatsService from './stats'
import playersRepository from '../repositories/players'

momentDurationFormatSetup(moment)

class PlayersService extends StatsService {
  async getPlayers() {
    const players = await playersRepository.getPlayers()
    return players.map(player => this.mapPlayer(player))
  }

  async getTeamPlayers(teamId) {
    const players = await playersRepository.getTeamPlayers(teamId)
    return players.map(player => this.mapPlayer(player))
  }

  async getPlayer(playerId) {
    const player = await playersRepository.getPlayer(playerId)
    return player !== null ? this.mapPlayer(player) : null
  }

  mapPlayer(player) {
    return {
      id: player.PlayerId,
      name: player.Name,
    }
  }

  async getStats(playerId) {
    const playerStats = await playersRepository.getStats(playerId)
    if (!playerStats.length) {
      return this.getDefaultStats(playerId)
    }

    const stats = {
      playerId,
      civilizationId: ss.modeFast(playerStats.map(ps => ps.CivilizationId)),
      statistics: {
        military: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'Statistics.military'))),
        economy: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'Statistics.economy'))),
        technology: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'Statistics.technology'))),
        society: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'Statistics.society'))),
        totalScore: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'Statistics.totalScore'))),
      },
      militaryStatistics: {
        largestArmy: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'MilitaryStatistics.largestArmy'))),
        unitsLost: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'MilitaryStatistics.unitsLost'))),
        unitsKilled: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'MilitaryStatistics.unitsKilled'))),
        unitsConverted: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'MilitaryStatistics.unitsConverted'))),
        buildingsLost: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'MilitaryStatistics.buildingsLost'))),
        buildingsRazed: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'MilitaryStatistics.buildingsRazed'))),
      },
      economyStatistics: {
        foodCollected: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.foodCollected'))),
        woodCollected: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.woodCollected'))),
        goldCollected: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.goldCollected'))),
        stoneCollected: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.stoneCollected'))),
        tradeProfit: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.tradeProfit'))),
        tributeReceived: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.tributeReceived'))),
        tributeSent: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'EconomyStatistics.tributeSent'))),
      },
      technologyStatistics: {
        researchCount: ss.max(playerStats.map(ps => this.getSafeStat(ps, 'TechnologyStatistics.researchCount'))),
        mapExplored: ss.max(playerStats.map(ps => this.getSafeStat(ps, 'TechnologyStatistics.mapExplored'))),
        researchPercent: ss.max(playerStats.map(ps => this.getSafeStat(ps, 'TechnologyStatistics.researchPercent'))),
        feudalAge: this.findLowestDuration(playerStats, 'TechnologyStatistics.feudalAge'),
        castleAge: this.findLowestDuration(playerStats, 'TechnologyStatistics.castleAge'),
        imperialAge: this.findLowestDuration(playerStats, 'TechnologyStatistics.imperialAge'),
      },
      societyStatistics: {
        villagerHigh: ss.max(playerStats.map(ps => this.getSafeStat(ps, 'SocietyStatistics.villagerHigh'))),
        relicsCaptured: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'SocietyStatistics.relicsCaptured'))),
        relicGold: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'SocietyStatistics.relicGold'))),
        totalCastles: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'SocietyStatistics.totalCastles'))),
        totalWonders: ss.sum(playerStats.map(ps => this.getSafeStat(ps, 'SocietyStatistics.totalWonders'))),
        survivalToFinish: true,
      },
    }

    const civilizations = await civilizationsService.getCivilizations()
    stats.civilizationName = (civilizations.find(({ id }) => id === stats.civilizationId) || { name: '' }).name

    return stats
  }

  getSafeStat(stats, field, defaultValue = 0) {
    return Number(_.get(stats, field, defaultValue) || defaultValue)
  }

  findLowestDuration(playerStats, field) {
    const lowestDuration = playerStats.reduce((res, ps) => {
      const age = _.get(ps, field)
      if (!age) {
        return res
      }

      const ageDuration = moment.duration(age)
      return res === null
        ? ageDuration
        : res.asSeconds() <= ageDuration.asSeconds() ? res : ageDuration
    }, null)
    return lowestDuration !== null
      ? lowestDuration.format('hh:mm:ss', { trim: false })
      : null
  }
}

export default new PlayersService()
