import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 180,
  events: [
    {
      http: {
        method: "get",
        path: "events",
        private: true,
      },
    },
  ],
  maximumRetryAttempts: 1,
};
