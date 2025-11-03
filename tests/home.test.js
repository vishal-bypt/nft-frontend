import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getData } from "../src/app/home/page";
import { HomeUI }  from "../src/app/home/page";




describe("getData", () => {
  afterEach(() => {
    global.fetch && jest.restoreAllMocks();
  });

  it("fetches data and returns JSON when response is ok", async () => {
    const mockJson = { title: "Test Product" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockJson),
    });

    const data = await getData();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/1",
      expect.objectContaining({
        next: { revalidate: 60 },
      })
    );
    expect(data).toEqual(mockJson);
  });

  it("throws an error when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(),
    });

    await expect(getData()).rejects.toThrow("Failed to fetch data");
  });

  it("Check the label is render or not", async () => {
    render(<HomeUI data={{ title: "Test Product" }}  />);
    const title = await screen.findByTestId('title');
    expect(title).toBeInTheDocument();
  });
});
