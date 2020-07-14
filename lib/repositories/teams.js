import * as uuid from 'uuid'
import AWS from '../aws'
import { KEYS, TYPES } from '../config/constants'

class TeamsRepository {
  async getTeams() {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'Type',
      },
      ExpressionAttributeValues: {
        ':type': TYPES.TEAM,
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

  async getTeam(teamId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.TEAM}${teamId}`,
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

  async saveTeam({ name, players }) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const teamId = uuid.v4()
    const playersWithId = players.map(({ name }) => ({ id: uuid.v4(), name }))
    const params = {
      TransactItems: [
        {
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.TEAM}${teamId}`,
              SK: `${KEYS.METADATA}${teamId}`,
              Type: TYPES.TEAM,
              TeamId: teamId,
              Name: name,
            },
          },
        },
        ...playersWithId.map(({ id }) => ({
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.TEAM}${teamId}`,
              SK: `${KEYS.PLAYER}${id}`,
              Type: TYPES.TEAM,
              TeamId: teamId,
              PlayerId: id,
            },
          },
        })),
        ...playersWithId.map(({ id, name }) => ({
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.PLAYER}${id}`,
              SK: `${KEYS.METADATA}${id}`,
              Type: TYPES.PLAYER,
              PlayerId: id,
              Name: name,
            },
          },
        })),
      ],
    }

    try {
      await docClient.transactWrite(params).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export default new TeamsRepository()
