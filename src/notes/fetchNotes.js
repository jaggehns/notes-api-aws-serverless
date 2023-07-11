"use strict";

const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const fetchNotes = async (event) => {
  const dynamoClient = new DynamoDBClient({ region: "ap-southeast-2"});

  let startDate = new Date();

  const input = {
    TableName: "NotesTable",
  }

  try {
    const data = await dynamoClient.send(new ScanCommand(input));
    
    let endDate = new Date();
    let executionTimeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log("Execution time:", executionTimeInSeconds);

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  handler: fetchNotes
}