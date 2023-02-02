import type { AWS } from "@serverless/typescript";

import functions from "./src/functions/index";

const serverlessConfiguration: AWS = {
  service: "birdie-backend",
  frameworkVersion: "3",
  plugins: [
    "serverless-offline",
    "serverless-esbuild",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    profile: "gary-personal",
    runtime: "nodejs14.x",
    region: "eu-west-2",
    timeout: 180,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["birdieTestApiKey"],
    },
  },
  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      platform: "node",
    },
  },
};

module.exports = serverlessConfiguration;
