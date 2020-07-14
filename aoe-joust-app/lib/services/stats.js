class StatsService {
  mapStats(stats) {
    return stats.map(({
      PK,
      SK,
      CivilizationId,
      Statistics,
      MilitaryStatistics,
      EconomyStatistics,
      TechnologyStatistics,
      SocietyStatistics,
    }) => ({
      id: PK.replace('MATCH#', ''),
      playerId: SK.replace('PLAYER#', ''),
      civilizationId: CivilizationId,
      statistics: Statistics,
      militaryStatistics: MilitaryStatistics,
      economyStatistics: EconomyStatistics,
      technologyStatistics: TechnologyStatistics,
      societyStatistics: SocietyStatistics,
    }))
  }

  getDefaultStats(playerId) {
    return {
      playerId,
      civilizationId: null,
      statistics: {
        military: 0,
        economy: 0,
        technology: 0,
        society: 0,
        totalScore: 0,
      },
      militaryStatistics: {
        largestArmy: 0,
        unitsLost: 0,
        unitsKilled: 0,
        unitsConverted: 0,
        buildingsLost: 0,
        buildingsRazed: 0,
      },
      economyStatistics: {
        foodCollected: 0,
        woodCollected: 0,
        goldCollected: 0,
        stoneCollected: 0,
        tradeProfit: 0,
        tributeReceived: 0,
        tributeSent: 0,
      },
      technologyStatistics: {
        researchCount: 0,
        mapExplored: 0,
        researchPercent: 0,
        feudalAge: null,
        castleAge: null,
        imperialAge: null,
      },
      societyStatistics: {
        villagerHigh: 0,
        relicsCaptured: 0,
        relicGold: 0,
        totalCastles: 0,
        totalWonders: 0,
        survivalToFinish: true,
      },
    }
  }
}

export default StatsService
