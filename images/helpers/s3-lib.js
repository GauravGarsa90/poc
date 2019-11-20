const AWS = require('aws-sdk');

export function upload(params) {
    const s3 = new AWS.S3();
    s3.putObject(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
  }