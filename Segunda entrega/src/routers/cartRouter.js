import { Router } from "express";
import { ProductDao, CartDao } from "../dao/index.js";
import { DATE_UTILS } from "../utils/date.js"

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cart = await CartDao.getById(id);

  res.send({ success: true, cart });
});

router.post("/", async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    
  const cart = await CartDao.save(baseCart);

  res.send({ success: true, cartId: cart.id });
});

router.post("/:cartId/products", async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(cartId);

  if (!cart)
    return res.send({ error: true});

  const product = await ProductDao.getById(productId);

  if (!product)
    return res.send({ error: true});

  cart.products.push(product);

  const updatedCart = await CartDao.updateById(cartId, cart);

  res.send({ success: true, cart: updatedCart });
});

export { router as CartRouter };