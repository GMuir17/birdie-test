import { APIGatewayProxyHandler } from "aws-lambda";

import {
  corsSuccessResponse,
  corsErrorResponse,
} from "../../libs/lambda-response";
import getConnection from "../../libs/db";

export const main: APIGatewayProxyHandler = async (event) => {
  console.log("banana in lambda");
  const { startDate, endDate } = event.queryStringParameters;

  try {
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
    const testResponse = corsSuccessResponse({
      statusCode: 200,
    });
    console.log("banana testResponse", testResponse);
    return corsSuccessResponse({
      statusCode: 200,
      body: { events: rows },
    });
  } catch (e) {
    console.log("error", e);
    return corsErrorResponse(e, 400);
  }
};
