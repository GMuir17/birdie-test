import React from "react";
import { render } from "@testing-library/react";
import EventCard from "../components/EventCard";

test("Event card should have event details", async () => {
  const { queryByTestId } = render(
    <EventCard
      event={{
        event_type: "task_completed",
        payload: { task_definition_description: "Test task complete" },
        caregiver_first_name: "Test",
        timestamp: "2021-09-01T12:00:00.000Z",
      }}
    />
  );

  const card = queryByTestId("task_completed_card") as HTMLParagraphElement;
  console.log("banana element", card.textContent);
  expect(card.textContent).toBe("Test task complete");
});
