const express = require("express");
const app = express();
let PORT: number;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
} else {
  PORT = 5000;
}

app.get("/api", (req: any, res: any) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
