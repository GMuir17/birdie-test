import * as request from "supertest";
import * as dotenv from "dotenv";

import app from "../src/application";
dotenv.config();

describe("Get /events", () => {
  it("should return an array", async () => {
    await request(app)
      .get("/events")
      .expect(200)
      .expect(function (res) {
        expect(res.body.events[0]["caregiver_id"]).toBeTruthy();
      });
  });
});
