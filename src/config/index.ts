import * as dotenv from 'dotenv';

dotenv.config();

export const VERSION = {
  v1: '/api/v1',
};

export default {
  port: process.env.PORT,
  ses: {
    sender: process.env.EMAIL_SENDER as string,
    region: process.env.REGION,
    apiVersion: '2010-12-01',
  },
  auth: {
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID as string,
    clientId: process.env.AWS_COGNITO_CLIENT_ID as string,
    apiToken: process.env.AWS_COGNITO_CLIENT_ID as string
  }
};
