"use strict"

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Testing deployment of the code of a fucnction",
        input: event,
      },
      null,
      2
    ),
  };
};