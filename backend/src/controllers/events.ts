import * as express from "express";
import { RequestHandler } from "express";
import * as mysql from "mysql2/promise";

export const eventsController = express.Router();

eventsController.get("/events", (async (_, res) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows] = await connection.execute("SELECT * FROM events limit 100");
  await connection.end();
  return res.status(200).send({ events: rows });
}) as RequestHandler);
//  ^^ request handler above removes a linting error
