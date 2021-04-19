import * as React from "react";
import { App } from "./App";
import { render, waitFor, screen } from "@testing-library/react";

it("renders without crashing", async () => {
  render(<App />);
  await waitFor(() => screen.getByRole("heading"));
  const Home = screen.getByText("Home");
  const Nowhere = screen.getByText("Nowhere");
  const Everywhere = screen.getByText("Everywhere");

  expect(screen.getByRole("heading")).toHaveTextContent("Serto UI");
  expect(Home).toHaveTextContent("Home");
  expect(Nowhere).toHaveTextContent("Nowhere");
  expect(Everywhere).toHaveTextContent("Everywhere");
  expect(Nowhere.closest("a")).toHaveAttribute("href", "/nowhere");
  expect(Everywhere.closest("a")).toHaveAttribute("href", "/everywhere");
  expect(screen.getByText("Welcome!")).toHaveTextContent("Welcome!");
});
