import * as uuid from 'uuid'
import AWS from '../aws'
import { KEYS, TYPES } from '../config/constants'

class MatchesRepository {
  async getMatches() {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'Type',
      },
      ExpressionAttributeValues: {
        ':type': TYPES.MATCH,
      },
    }

    try {
      const response = await docClient.query(params).promise()
      return response.Items
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getMatch(matchId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.MATCH}${matchId}`,
      },
    }

    try {
      const response = await docClient.query(params).promise()
      return response.Items
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getStats(matchId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'PK = :pk and begins_with(SK, :playerPrefix)',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.MATCH}${matchId}`,
        ':playerPrefix': KEYS.PLAYER,
      },
    }

    try {
      const response = await docClient.query(params).promise()
      return response.Items
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getPlayerStats(matchId, playerId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'PK = :pk and SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.MATCH}${matchId}`,
        ':sk': `${KEYS.PLAYER}${playerId}`,
      },
    }

    try {
      const response = await docClient.query(params).promise()
      return response.Items.length ? response.Items[0] : null
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async saveMatch({ mapId, date, teams }) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const matchId = uuid.v4()
    const params = {
      TransactItems: [
        {
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.MATCH}${matchId}`,
              SK: `${KEYS.METADATA}${matchId}`,
              Type: TYPES.MATCH,
              MatchId: matchId,
              MapId: mapId,
              Date: date,
            },
          },
        },
        ...teams.map(team => ({
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.MATCH}${matchId}`,
              SK: `${KEYS.TEAM}${team}`,
              Type: TYPES.MATCH,
              MatchId: matchId,
              TeamId: team,
            },
          },
        }))
      ],
    }

    try {
      await docClient.transactWrite(params).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async saveStats({ matchId, stats }) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TransactItems: stats.map(({
        playerId,
        civilizationId,
        statistics,
        militaryStatistics,
        economyStatistics,
        technologyStatistics,
        societyStatistics,
      }) => ({
        Put: {
          TableName: 'AOETournaments',
          Item: {
            PK: `${KEYS.MATCH}${matchId}`,
            SK: `${KEYS.PLAYER}${playerId}`,
            CivilizationId: civilizationId,
            Statistics: statistics,
            MilitaryStatistics: militaryStatistics,
            EconomyStatistics: economyStatistics,
            TechnologyStatistics: technologyStatistics,
            SocietyStatistics: societyStatistics,
          },
        },
      })),
    }

    try {
      await docClient.transactWrite(params).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export default new MatchesRepository()
