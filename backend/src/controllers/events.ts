import * as express from "express";
import { RequestHandler } from "express";

import getConnection from "../libs/db";

export const eventsController = express.Router();

eventsController.get("/events", (async (req, res) => {
  const startDate = req.query.startDate || "2019-04-23T00:00:0.000Z";
  const endDate = req.query.endDate || "2019-04-24T00:00:00.000Z";

  const connection = await getConnection();
  const [rows] = await connection.execute(
    `  select 
        events.*, 
        tcr.name care_recipient_name,
        tcg.first_name caregiver_first_name,
        tcg.last_name caregiver_last_name
      from events 
      inner join test_care_recipients tcr on events.care_recipient_id = tcr.id
      inner join test_caregivers tcg on events.caregiver_id = tcg.id
      where care_recipient_id = ?
      and events.timestamp between ? and ?
      order by timestamp asc;`,
    ["df50cac5-293c-490d-a06c-ee26796f850d", startDate, endDate]
  );

  await connection.end();
  return res.status(200).send({ events: rows });
}) as RequestHandler);
//  ^^ request handler above removes a linting error
