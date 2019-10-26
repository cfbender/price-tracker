import { Router } from "express";
const router = Router();

//@ts-ignore
import { Item, Example } from "../../../models";

import { scraper } from "../../lib/scraper";

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
        await Item.update({ currentPrice, lowestPrice }, { where: { id } });
      }
    )
  );

  let updatedData = await Item.findAll({ where: { userId } });

  return updatedData;
}

router.get("/user/data", async (req: any, res: any) => {
  const userId = req.user.sub;
  const data = await updatePrices(userId);
  res.json(data);
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
    const data = await updatePrices(userId);
    res.json(data);
  } else {
    res.json({ error: true });
  }
});

router.delete("/remove/:id", async (req: any, res: any) => {
  await Item.destroy({
    where: {
      id: req.params.id
    }
  });

  res.sendStatus(200);
});

router.get("/examples", async (req: any, res: any) => {
  const data = await Example.findAll();
  res.json(data);
});

export const apiRoutes = router;
