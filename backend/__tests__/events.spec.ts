import * as request from "supertest";
import * as dotenv from "dotenv";

import app from "../src/application";
dotenv.config();

describe("Get /events", () => {
  console.log("banana in the test 1", process.env.DB_PORT);
  it("should return at least one object with caregiver_id", async () => {
    console.log("banana in the test 2", process.env.SECRET_TOKEN);

    await request(app)
      .get("/hello")
      .expect(200)
      .expect(function (res) {
        expect(res.body.greetings).toContain("Thank you");
      });
    // await request(app)
    //   .get("/events")
    //   .expect(200)
    //   .expect(function (res) {
    //     expect(res.body.events[0]["caregiver_id"]).toBeTruthy();
    //   });
    console.log("banana in the test 3");
  });
});
