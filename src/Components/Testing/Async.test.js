import { render, screen } from "@testing-library/react";
import Async from "./Async";
describe("async Component", () => {
  test("render posts if request sucsessfull", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "p1",
          title: "First Post",
        },
      ],
    });
    render(<Async />);
    const ListItemElement = await screen.findAllByRole(`listitem`);
    expect(ListItemElement).not.toHaveLength(0);
  });
});