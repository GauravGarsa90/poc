// import * as helpers from 'helpers';
const helpers = require('helpers');

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      imageUrl: 'tmp',
      name: data.name,
      age: data.age,
      createdAt: Date.now()
    }
  };

  try {
    await helpers.dynamoDbLib.call("put", params);
    return helpers.response.success(params.Item);
  } catch (e) {
    return helpers.response.failure({ status: false });
  }
}