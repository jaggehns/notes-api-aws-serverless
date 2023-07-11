"use strict";

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const ULID = require('ulid')

const addNote = async (event) => {
  const { note } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = ULID.ulid();

  let startDate = new Date();

  const dynamoClient = new DynamoDBClient({ region: "ap-southeast-2"});

  const input = {
    TableName: "NotesTable",
    Item: {
      id: { S: id },
      note: { S: note },
      createdAt: { S: createdAt }
    }
  };

  try {
    await dynamoClient.send(new PutItemCommand(input));
  } catch(err) {
    console.log(err);
  }
  
  // If updating items, it is possible to use ReturnValue: to return the record:
  // const input = {
  //   TableName: "NotesTable",
  //   Item: {
  //     id: { S: id },
  //     note: { S: note },
  //     createdAt: { S: createdAt }
  //   },
  //   ReturnValue: "ALL_NEW" <-- WE CAN DO THIS
  // };
  // This does not work with the PutItemCommand. So in order to return the record
  // we need to create it.
  const newNote = {
    id: { S: id },
    note: { S: note },
    createdAt: { S: createdAt }
  }

  let endDate = new Date();

  let executionTimeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

  console.log("Execution time:", executionTimeInSeconds);

  return {
    statusCode: 200,
    body: JSON.stringify(newNote),
  };
};

module.exports = {
  handler: addNote
}