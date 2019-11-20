import * as dynamoDbLib from './helpers/dynamodb-lib';
import * as s3 from './helpers/s3-lib';
import { success, failure } from './helpers/response-lib';

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const date = Date.now();
  let buffer;
  if(data.image){
    buffer = new Buffer(data.image, 'base64');
  }
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      imageUrl: 'tmp',
      name: data.name,
      age: data.age,
      createdAt: date
    }
  };
  const bucketParams = {
    Bucket: process.env.bucket,
    Key: data.name + '-' + date + '.jpg',
    Body: buffer
  };

  try {
    await dynamoDbLib.call("put", params);
    if(data.image)
      await s3.call(bucketParams);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}