
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import StoredTradesTable from "../components/StoredTradesTable";

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

describe("Stored trade tables", () => {
    test("it shows a table of trades", async () => {
        const fakeResponse = [{"trade_id":1,"Sell_CCY":"HUF","Sell_Amount":142131,"Buy_CCY":"AUD","Buy_Amount":69.2474,"Rate":0.00487212,"Date_Booked":"2019-11-24 16:50:47"}];
        jest.spyOn(window, "fetch").mockImplementation(() => {
            const fetchResponse = {
                json: () => Promise.resolve(fakeResponse)
            };
          return Promise.resolve(fetchResponse);
        });
        await act(async () => {
          render(<StoredTradesTable />, container);
        });
        expect(container.textContent).toBe("Booked trades");
        window.fetch.mockRestore();
      });
    });