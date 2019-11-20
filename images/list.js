import * as helpers from './helpers';
var { success, failure } = helpers.response;
var dynamoDbLib = helpers.dynamoDbLib;

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await helpers.dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return helpers.response.success(result.Items);
  } catch (e) {
    return helpers.response.failure({ status: false });
  }
}