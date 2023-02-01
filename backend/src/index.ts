import * as dotenv from "dotenv";
import * as serverlessExpress from "aws-serverless-express";
import { APIGatewayProxyHandler } from "aws-lambda";

dotenv.config();

import app from "./application";

const server = serverlessExpress.createServer(app);

export const handler: APIGatewayProxyHandler = (event, context) => {
  serverlessExpress.proxy(server, event, context);
};
