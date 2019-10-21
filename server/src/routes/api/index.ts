import { Router } from "express";
const router = Router();
//@ts-ignore
import { Item } from "../../../models";
import { scraper } from "../../lib/scraper";
import { ParamsArray, Params } from "express-serve-static-core";

router.get("/user/data", async (req: any, res: any) => {
  let data = await Item.findAll({ where: { userId: req.user.sub } });
  res.json(data);
});

router.post("/new", async (req: any, res: any) => {
  // search for new item, and add if valid
});

export const apiRoutes = router;
