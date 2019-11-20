var dynamoDbLib = require('helpers/dynamodb-lib');
var { success, failure } = require('helpers/response-lib');
var exportObj = {};
exportObj.dynamo = dynamoDbLib;
exportObj.response.success = success;
exportObj.response.failure = failure;
module.exports = exportObj;