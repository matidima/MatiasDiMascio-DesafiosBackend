import { Router } from "express";
import { productsMongo } from "../dao/ProductMongoDB.js";
import { cartMongo } from "../dao/cartMongoDB.js";
import { DATE_UTILS } from "../utils/date.js"

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cart = await cartMongo.getById(id);

  res.send({ success: true, cart });
});

router.post("/", async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    
  const cart = await cartMongo.save(baseCart);

  res.send({ success: true, cartId: cart.id });
});

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

router.post("/:cartId/products", async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await cartMongo.getById(cartId);

  if (!cart)
    return res.send({ error: true});

  const product = await productsMongo.getById(productId);

  if (!product)
    return res.send({ error: true});

  // TODO
  cart.products.push(product);

  const updatedCart = await cartMongo.updateById(cartId, cart);

  res.send({ success: true, cart: updatedCart });
});

export { router as CartRouter };