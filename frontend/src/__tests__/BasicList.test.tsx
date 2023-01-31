import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BasicList from "../components/BasicList";

const setup = () => {
  const wrapper = render(<BasicList />);
  return {
    getSelectInput() {
      return wrapper.queryByTestId("select-input") as HTMLInputElement;
    },
    getSelectButton() {
      return wrapper.queryByTestId("select-button") as HTMLElement;
    },
    wrapper,
  };
};

test("Select", async () => {
  const { getByLabelText, getByText, getAllByText, queryByTestId } = render(
    <BasicList />
  );

  const selectInput = queryByTestId("select-input") as HTMLInputElement;
  expect(selectInput).toHaveProperty("value", "10");
  expect(getByText("Ten")).toBeTruthy();

  // click open select menu and click twenty
  await userEvent.click(getByLabelText("Age"));
  await userEvent.click(getByText("Twenty"));

  expect(getAllByText("Twenty")).toBeTruthy();
  expect(selectInput).toHaveProperty("value", "20");
});
