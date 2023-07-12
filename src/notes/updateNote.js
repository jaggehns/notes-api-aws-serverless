"use strict";

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const updateNote = async (event) => {
  const { note } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  let startDate = new Date();

  const dynamoClient = new DynamoDBClient({ region: "ap-southeast-2"});

  const input = {
    TableName: "NotesTable",
    Key: {
      id: { S: id }
    },
    UpdateExpression: "SET note = :n",
    ExpressionAttributeValues: {
      ":n": { S: note },
    },
    ReturnValues: "UPDATED_NEW"
  }

  try {
    const data = await dynamoClient.send(new UpdateItemCommand(input));

    let endDate = new Date();
    let executionTimeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log("Execution time:", executionTimeInSeconds);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        "note": JSON.stringify(data.Attributes) 
      }),
    }
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  handler: updateNote
}