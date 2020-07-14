import AWS from 'aws-sdk'
import * as uuid from 'uuid'

export default (req, res) => {
  if (req.method === 'POST') {
    createBucket(req, res)
  } else {
    handleCredentials(req, res)
  }
}

const createBucket = (req, res) => {
  // Create unique bucket name
  var bucketName = 'node-sdk-sample-' + uuid.v4();
  // Create name for uploaded object key
  var keyName = 'hello_world.txt';

  // Create a promise on S3 service object
  var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

  // Handle promise fulfilled/rejected states
  bucketPromise.then(
    function (data) {
      // Create params for putObject call
      var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
      // Create object upload promise
      var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
      uploadPromise.then(
        function (data) {
          res.statusCode = 200
          res.json({ message: "Successfully uploaded data to " + bucketName + "/" + keyName })
        });
    }).catch(
      function (err) {
        res.statusCode = 500
        res.json(err)
      });
}

const handleCredentials = (req, res) => {
  AWS.config.getCredentials(function (err) {
    if (err) {
      res.statusCode = 500
      res.json(err)
    } else {
      res.statusCode = 200
      res.json({ key: AWS.config.credentials.accessKeyId, region: AWS.config.region })
    }
  })
}
