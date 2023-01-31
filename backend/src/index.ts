import { RequestHandler } from "express";
import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

import app from "./application";

const port = process.env.PORT || 8000;

app.get("/events", (async (_req, res) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows] = await connection.execute("SELECT * FROM events limit 100");

  return res.status(200).send({ events: rows });
}) as RequestHandler);
//  ^^ request handler above removes a linting error

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
