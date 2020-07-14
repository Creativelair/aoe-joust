const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const params = {
  TableName: 'AOETournaments',
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S',
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S',
    },
    {
      AttributeName: 'Type',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'InvertedIndex',
      KeySchema: [
        {
          AttributeName: 'SK',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'PK',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
    {
      IndexName: 'TypeIndex',
      KeySchema: [
        {
          AttributeName: 'Type',
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  StreamSpecification: {
    StreamEnabled: false
  },
};

ddb.createTable(params).promise()
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((err) => {
    console.error(err);
  });
