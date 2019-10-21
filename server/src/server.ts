import express from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

import routes from "./routes";
const app = express();

const authConfig = {
  domain: "dev-c-1dmcf8.auth0.com",
  audience: "https://api.cfb-price-tracker.herokuapp.com/"
};

let PORT: number;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
} else {
  PORT = 5000;
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});
app.use(checkJwt);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
