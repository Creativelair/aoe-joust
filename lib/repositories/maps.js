import * as uuid from 'uuid'
import AWS from '../aws'
import { KEYS, TYPES } from '../config/constants'

class MapsRepository {
  async getMaps() {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'Type',
      },
      ExpressionAttributeValues: {
        ':type': TYPES.MAP,
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

  async getMap(mapId) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `${KEYS.MAP}${mapId}`,
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

  async saveMap({ name, image }) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const mapId = uuid.v4()
    const params = {
      TransactItems: [
        {
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.MAP}${mapId}`,
              SK: `${KEYS.METADATA}${mapId}`,
              Type: TYPES.MAP,
              MapId: mapId,
              Name: name,
              Image: image,
            },
          },
        },
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

export default new MapsRepository()
