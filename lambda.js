'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./dist/app').app;
const Database = require('./dist/connection/connection').Database;

exports.handler = async (event, context) => {
  console.log(`Event: Path - ${event.path} Method: ${event.httpMethod}`);
  require('dotenv').config();
    const server = awsServerlessExpress.createServer(app);
  try {
    await new Database().getConnection();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  return new Promise(() => {
    awsServerlessExpress.proxy(server, event, context);
  });
};
