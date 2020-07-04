import * as uuid from 'uuid'
import AWS from '../aws'
import { KEYS, TYPES } from '../config/constants'

class CivilizationsRepository {
  async getCivilizations() {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'AOETournaments',
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'Type',
      },
      ExpressionAttributeValues: {
        ':type': TYPES.CIVILIZATION,
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

  async saveCivilization({ name, image }) {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const civilizationId = uuid.v4()
    const params = {
      TransactItems: [
        {
          Put: {
            TableName: 'AOETournaments',
            Item: {
              PK: `${KEYS.CIVILIZATION}${civilizationId}`,
              SK: `${KEYS.METADATA}${civilizationId}`,
              Type: TYPES.CIVILIZATION,
              CivilizationId: civilizationId,
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

export default new CivilizationsRepository()
