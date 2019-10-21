import { scraper } from "../lib/scraper";

describe("scraper", () => {
  it("Should return false on non url", async () => {
    expect(scraper("any")).toBe(false);
  });

  it("Should return number from site", async () => {
    expect(
      scraper(
        "https://bonobos.com/products/superfine-short-sleeve-henley?color=navy&shirt-size=xl&shirt-fit=slim"
      )
    ).toMatch(/([0-9]+\.?([0-9]+)?)/);

    expect(
      scraper(
        "https://www.bestbuy.com/site/nintendo-new-nintendo-2ds-xl-with-mario-kart-7-white-orange/6296014.p?skuId=6296014".toUpperCase()
      )
    ).toMatch(/([0-9]+\.?([0-9]+)?)/);
  });
});
