import { urlToSelector } from "../lib/urlToSelector";

describe("urlToSelector", () => {
  it("Should not throw error on string", () => {
    expect(() => urlToSelector("any")).not.toThrowError();
  });

  it("Should resolve host name", () => {
    expect(
      urlToSelector("https://www.amazon.com/test/value?test=works&maybe=true")
    ).toBe("span#priceblock_ourprice");

    expect(
      urlToSelector(
        "https://www.amazon.com/test/value?test=works&maybe=true".toUpperCase()
      )
    ).toBe("span#priceblock_ourprice");

    expect(
      urlToSelector(
        "https://bonobos.com/products/highland-tour-golf-pants?color=slate%20grey".toUpperCase()
      )
    ).toStrictEqual([
      "span.summary---fullPrice---40MV_",
      ".summary---salePrice---3T4Vk"
    ]);
  });
});
