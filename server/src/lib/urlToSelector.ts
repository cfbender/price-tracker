import parseDomain = require("parse-domain");
import { selectors } from "./selectors";

export const urlToSelector = (urlString: string) => {
  const parsed = parseDomain(urlString);
  return parsed ? selectors[parsed.domain] : null;
};
