"use strict";

const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const deleteNote = async (event) => {
  const { id } = event.pathParameters;

  const dynamoClient = new DynamoDBClient({ region: "ap-southeast-2"});

  let startDate = new Date();

  const input = {
    TableName: "NotesTable",
    Key: {
      id: { S: id },
    }
  }

  try {
    const data = await dynamoClient.send(new DeleteItemCommand(input));
    
    let endDate = new Date();
    let executionTimeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log("Execution time:", executionTimeInSeconds);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  handler: deleteNote
}