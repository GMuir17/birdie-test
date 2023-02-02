import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "careGivers",
        private: true,
        cors: true,
      },
    },
  ],
  maximumRetryAttempts: 1,
};
