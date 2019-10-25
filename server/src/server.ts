import express from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

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
}).unless({
  path: [
    { url: "/", methods: ["GET"] },
    { url: "/api/examples", methods: ["GET"] },
    "/static"
  ]
});

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "..", "client/build/static"))
);
app.use(checkJwt);
app.use(express.json());
app.use(routes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client/build/index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

export default app;
