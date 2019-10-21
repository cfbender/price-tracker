import { Router } from "express";
const router = Router();

//@ts-ignore
import { Item } from "../../../models";

import { scraper } from "../../lib/scraper";
import { selectors } from "../../lib/selectors";

export async function updatePrices(userId: string) {
  const data = await Item.findAll({ where: { userId } });

  data.map((item: any) => {
    let newItem = item;
    const price = scraper(item.url);
    newItem.currentPrice = price ? price : "Error";
    newItem.lowestPrice =
      price < newItem.lowestPrice ? price : newItem.lowestPrice;

    return newItem;
  });

  await data.forEach(
    async ({ currentPrice, lowestPrice, id }: { [k: string]: string }) => {
      await Item.update({ currentPrice, lowestPrice }, { where: { id } });
    }
  );
}

router.get("/user/data", async (req: any, res: any) => {
  const userId = req.user.sub;
  await updatePrices(userId);
  const data = await Item.findAll({ where: { userId } });
  res.json(data);
});

router.get("site/data", async (req: any, res: any) => {
  const data = Object.keys(selectors);
  res.json({ sites: data });
});

router.post("/new", async (req: any, res: any) => {
  const userId = req.user.sub;
  const { url, name } = req.body;

  let price = scraper(url);

  if (price) {
    await Item.create({
      name: name,
      userId: userId,
      url: url,
      currentPrice: price,
      originalPrice: price,
      lowestPrice: price
    });
  }

  const data = await updatePrices(userId);
  res.json(data);
});

export const apiRoutes = router;
