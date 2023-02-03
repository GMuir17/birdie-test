import { APIGatewayProxyHandler } from "aws-lambda";
import dayjs from "dayjs";

import {
  corsSuccessResponse,
  corsErrorResponse,
} from "../../libs/lambda-response";
import getConnection from "../../libs/db";

export const main: APIGatewayProxyHandler = async (event) => {
  const { startDate, careGivers, eventTypes } = event.queryStringParameters;
  const endDate = dayjs(startDate).add(1, "day").format("YYYY-MM-DD");

  // hard coded for now
  const careRecipientId = "df50cac5-293c-490d-a06c-ee26796f850d";

  try {
    const connection = await getConnection();

    if (careGivers && !eventTypes) {
      const careGiversArray = careGivers?.split(",");

      const [rows] = await connection.execute(
        `select 
            events.*, 
            tcr.name care_recipient_name,
            tcg.first_name caregiver_first_name,
            tcg.last_name caregiver_last_name
          from events 
          inner join test_care_recipients tcr on events.care_recipient_id = tcr.id
          inner join test_caregivers tcg on events.caregiver_id = tcg.id
          where care_recipient_id = ?
          and events.timestamp between ? and ?
          and caregiver_id in (${careGiversArray.map(() => "?").join(",")})
          order by timestamp asc;`,
        [careRecipientId, startDate, endDate, ...careGiversArray]
      );

      await connection.end();

      return corsSuccessResponse({
        statusCode: 200,
        body: { events: rows },
      });
    } else if (eventTypes && !careGivers) {
      const eventTypesArray = eventTypes?.split(",");

      const [rows] = await connection.execute(
        `select 
            events.*, 
            tcr.name care_recipient_name,
            tcg.first_name caregiver_first_name,
            tcg.last_name caregiver_last_name
          from events 
          inner join test_care_recipients tcr on events.care_recipient_id = tcr.id
          inner join test_caregivers tcg on events.caregiver_id = tcg.id
          where care_recipient_id = ?
          and events.timestamp between ? and ?
          and event_type in (${eventTypesArray.map(() => "?").join(",")})
          order by timestamp asc;`,
        [careRecipientId, startDate, endDate, ...eventTypesArray]
      );

      await connection.end();

      return corsSuccessResponse({
        statusCode: 200,
        body: { events: rows },
      });
    } else if (eventTypes && careGivers) {
      const careGiversArray = careGivers?.split(",");
      const eventTypesArray = eventTypes?.split(",");
      const [rows] = await connection.execute(
        `select
            events.*,
            tcr.name care_recipient_name,
            tcg.first_name caregiver_first_name,
            tcg.last_name caregiver_last_name
          from events
          inner join test_care_recipients tcr on events.care_recipient_id = tcr.id
          inner join test_caregivers tcg on events.caregiver_id = tcg.id
          where care_recipient_id = ?
          and events.timestamp between ? and ?
          and caregiver_id in (${careGiversArray.map(() => "?").join(",")})
          and event_type in (${eventTypesArray.map(() => "?").join(",")})
          order by timestamp asc;`,
        [
          careRecipientId,
          startDate,
          endDate,
          ...careGiversArray,
          ...eventTypesArray,
        ]
      );

      await connection.end();

      return corsSuccessResponse({
        statusCode: 200,
        body: { events: rows },
      });
    } else {
      const [rows] = await connection.execute(
        `select 
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
        [careRecipientId, startDate, endDate]
      );

      await connection.end();

      return corsSuccessResponse({
        statusCode: 200,
        body: { events: rows },
      });
    }
  } catch (e) {
    return corsErrorResponse(e, 400);
  }
};
