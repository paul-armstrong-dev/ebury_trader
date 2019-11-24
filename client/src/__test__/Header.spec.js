
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from "../components/Header";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Header", () => {
    test("Displays a simple page header", async () => {
        await act(async () => {
          render(<Header />, container);
        });
        expect(container.textContent).toBe("Booked trades");
        window.fetch.mockRestore();
      });
    });