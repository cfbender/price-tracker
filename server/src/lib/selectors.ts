export const selectors: { [k: string]: string | string[] } = {
  amazon: [
    "#priceblock_ourprice",
    "#priceblock_dealprice",
    ".a-color-price.header-price",
    ".offer-price"
  ],
  bonobos: ["span.summary---fullPrice---40MV_", ".summary---salePrice---3T4Vk"],
  target: "div[data-test='product-price']",
  bestbuy:
    ".priceView-price > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)",
  walmart: ".price--stylized > span:nth-child(1)",
  newegg: "ul.has-label-membership:nth-child(3) > li:nth-child(3)"
};
