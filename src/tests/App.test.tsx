import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

it("displays the correct initial value on the screen element", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");
  expect(screenComponent).toBeInTheDocument();
  expect(screenComponent).toHaveTextContent("0");
});

it("updates screen value after clicking on number button", () => {
  const { getByText, getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  const buttonNumberOne = getByText("1");
  fireEvent.click(buttonNumberOne);
  expect(screenComponent).toHaveTextContent("1");

  const buttonNumberEight = getByText("8");
  fireEvent.click(buttonNumberEight);
  expect(screenComponent).toHaveTextContent("8");
});

it("adds numbers correctly", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("="));
  expect(screenComponent).toHaveTextContent("10");
});

it("subtracts numbers correctly", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  fireEvent.click(screen.getByText("8"));
  fireEvent.click(screen.getByText("-"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));
  expect(screenComponent).toHaveTextContent("6");
});

it("multiplies numbers correctly", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  fireEvent.click(screen.getByText("4"));
  fireEvent.click(screen.getByText("X"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));
  expect(screenComponent).toHaveTextContent("12");
});

it("divides numbers correctly", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  fireEvent.click(screen.getByText("8"));
  fireEvent.click(screen.getByText("/"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));
  expect(screenComponent).toHaveTextContent("4");
});

it("resets the calculator state when C button is clicked", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  fireEvent.click(screen.getByText("8"));
  fireEvent.click(screen.getByText("C"));
  expect(screenComponent).toHaveTextContent("0");
});

it("displays error message when dividing by zero", () => {
  const { getByTestId } = render(<App />);

  const screenComponent = getByTestId("calculator-screen");

  fireEvent.click(screen.getByText("8"));
  fireEvent.click(screen.getByText("/"));
  fireEvent.click(screen.getByText("0"));
  fireEvent.click(screen.getByText("="));
  expect(screenComponent).toHaveTextContent("Can't divide with 0");
});
