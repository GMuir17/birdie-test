import * as express from "express";
import { RequestHandler } from "express";

import getConnection from "../libs/db";

export const eventsController = express.Router();

eventsController.get("/events", (async (_, res) => {
  const connection = await getConnection();
  const [rows] = await connection.execute("SELECT * FROM events limit 100");
  await connection.end();
  return res.status(200).send({ events: rows });
}) as RequestHandler);
//  ^^ request handler above removes a linting error
