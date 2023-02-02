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
      `  select 
          distinct(events.caregiver_id), 
          tcg.first_name caregiver_first_name
        from events 
        inner join test_caregivers tcg on events.caregiver_id = tcg.id
        where events.care_recipient_id = ?
        and events.timestamp between ? and ?
        order by timestamp asc;`,
      ["df50cac5-293c-490d-a06c-ee26796f850d", startDate, endDate]
    );

    const careGivers = rows.map((row: any) => {
      return { name: row.caregiver_first_name, id: row.caregiver_id };
    });

    await connection.end();

    return corsSuccessResponse({
      statusCode: 200,
      body: { careGivers },
    });
  } catch (e) {
    console.log("error", e);
    return corsErrorResponse(e, 400);
  }
};
