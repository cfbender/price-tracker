export const selectors: { [k: string]: string | string[] } = {
  amazon: "span#priceblock_ourprice",
  bonobos: ["span.summary---fullPrice---40MV_", ".summary---salePrice---3T4Vk"],
  target: "div[data-test='product-price']",
  bestbuy:
    ".priceView-price > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
};
