import AWS from 'aws-sdk'

AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  s3: '2006-03-01',
};

export default AWS
