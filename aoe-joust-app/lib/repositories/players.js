import AWS from '../aws'
import { KEYS } from '../config/constants'

class PlayersRepository {
  async getPlayers() {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      FilterExpression: 'begins_with(PK, :playerPrefix)',
      ExpressionAttributeValues: {
        ':playerPrefix': KEYS.PLAYER,
      }
    }

    try {
      const response = await docClient.scan(params).promise()
      return response.Items
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getTeamPlayers(teamId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'pk = :pk and begins_with(sortKey, :playerPrefix)',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.TEAM}${teamId}`,
        ':playerPrefix': KEYS.PLAYER,
      }
    }

    try {
      const response = await docClient.query(params).promise()
      return response.Items
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getPlayer(playerId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.PLAYER}${playerId}`,
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

  async getStats(playerId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      IndexName: 'InvertedIndex',
      KeyConditionExpression: 'SK = :sk and begins_with(PK, :matchPrefix)',
      ExpressionAttributeValues: {
        ':sk': `${KEYS.PLAYER}${playerId}`,
        ':matchPrefix': KEYS.MATCH,
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
}

export default new PlayersRepository()
