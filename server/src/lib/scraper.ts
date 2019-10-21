import $ from "cheerio";
import puppeteer from "puppeteer";
import validator from "validator";

import { urlToSelector } from "./urlToSelector";

const dataScrape = (selector: string, html: string) => {
  const data = $(selector, html).html();
  if (data) {
    const match = data.match(/([0-9]+\.?([0-9]+)?)/);
    if (match) {
      return match[0];
    } else {
      return false;
    }
  }
};

export const scraper = async (url: string) => {
  if (!validator.isURL(url)) {
    return false;
  }
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"]
  });
  try {
    const page = await browser.newPage();

    await page.goto(url);
    const html = await page.content();
    const selector = urlToSelector(url);

    if (typeof selector === "string") {
      let result = dataScrape(selector, html);
      return result;
    } else if (Array.isArray(selector)) {
      let data = selector.map(item => dataScrape(item, html));
      return data.filter(item => item)[0];
    } else {
      return false;
    }
  } catch (error) {
    throw Error("Error on page retrieval");
  } finally {
    await browser.close();
  }
};
