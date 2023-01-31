import * as express from "express";
import { pingController } from "./controllers/ping";
import { eventsController } from "./controllers/events";

const app = express();

app.use(pingController);
app.use(eventsController);

export default app;
