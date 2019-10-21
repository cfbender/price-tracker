import path from "path";
import { Router as router } from "express";

router.get("/user/:id", (req: any, res: any) => {
  // validate jswt, refresh, and get user data
});

router.post("/api/new", async (req: any, res: any) => {
  // search for new item, and add if valid
});

module.exports = router;
