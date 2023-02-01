import * as express from "express";

import { pingController } from "./controllers/ping";
import { eventsController } from "./controllers/events";

const app = express();

app.use(pingController);
app.use(eventsController);

app.get("/hello", (_req, res) => {
  return res.status(200).json({
    message: "Hello, World!",
  });
});

export default app;
