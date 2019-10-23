import { Router } from "express";
const router = Router();

//@ts-ignore
import { Item } from "../../../models";

import { scraper } from "../../lib/scraper";
import { selectors } from "../../lib/selectors";

export async function updatePrices(userId: string) {
  let data = await Item.findAll({ where: { userId } });
  data = await Promise.all(
    data.map(async (item: any) => {
      let newItem = item;
      const price = await scraper(item.url);
      if (price) {
        newItem.currentPrice = price;
        newItem.lowestPrice =
          parseFloat(price) < parseFloat(newItem.lowestPrice)
            ? price
            : newItem.lowestPrice;
      } else {
        return "Error";
      }

      return newItem;
    })
  );

  await Promise.all(
    data.map(
      async ({ currentPrice, lowestPrice, id }: { [k: string]: string }) => {
        let result = await Item.update(
          { currentPrice, lowestPrice },
          { where: { id } }
        );
      }
    )
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

  let price = await scraper(url);
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

router.delete("/remove/:id", async (req: any, res: any) => {
  await Item.create({
    where: {
      id: req.params.id
    }
  });

  res.sendStatus(200);
});

export const apiRoutes = router;
