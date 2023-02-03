import { APIGatewayProxyHandler } from "aws-lambda";
import dayjs from "dayjs";

import {
  corsSuccessResponse,
  corsErrorResponse,
} from "../../libs/lambda-response";
import getConnection from "../../libs/db";

export const main: APIGatewayProxyHandler = async (event) => {
  const { startDate } = event.queryStringParameters;

  const endDate = dayjs(startDate).add(1, "day").format("YYYY-MM-DD");

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `select 
          distinct(event_type)
        from events 
        where care_recipient_id = ?
        and timestamp between ? and ?
        order by timestamp asc;`,
      ["df50cac5-293c-490d-a06c-ee26796f850d", startDate, endDate]
    );

    await connection.end();
    const eventTypes = rows.map((row: any) => row.event_type);

    return corsSuccessResponse({
      statusCode: 200,
      body: { eventTypes },
    });
  } catch (e) {
    return corsErrorResponse(e, 400);
  }
};
