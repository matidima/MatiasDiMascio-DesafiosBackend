import fs from "fs";
import { Router } from "express";
import { carritoApi, productApi } from "../api/api.js";
import { admin } from "../admin/admin.js";

const filepathProductos = "productos.json";
const filepathCart = "carrito.json";
const routerCarrito = Router();
const carrito = {
  timestamp: new Date(),
  productos: [],
};

routerCarrito.get("/", async (req, res) => {
  const carrito = await carritoApi.getAll(filepathCart);
  res.send(carrito);
});

routerCarrito.post("/", async (req, res) => {
  await carritoApi.save(carrito, filepathCart);
  const elementos = await carritoApi.getAll(filepathCart);
  res.send(elementos);
});

routerCarrito.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await carritoApi.deleteById(id, filepathCart);
  const carritos = await carritoApi.getAll(filepathCart);
  res.send(carritos);
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const cart = await carritoApi.getById(id);
  res.send(cart.productos);
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const { productId } = req.body;
  const { id } = req.params;
  const cart = await carritoApi.getById(Number(id));
  if (!cart)
    return res.send({ error: true, message: "Carrito no encontrado" });

  const product = await productApi.getById(Number(productId));

  if (!product)
    return res.send({ error: true, message: "Producto no encontrado" });

  cart.productos.push(product);
  const updatedCart = await carritoApi.updateById(Number(id), cart);
  res.send({ cart: updatedCart });
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id } = req.params;
  const { productId } = req.params;
  let cart = await carritoApi.getById(id, filepathCart);
  if (cart === null) {
    res.send("Error: no se pudo encontrar el carrito");
  } else {
    cart = cart.elemento;
    const productosFiltrados = cart.productos.filter(
      (elemento) => elemento.id != productId
    );
    if (productosFiltrados === null) {
      res.send("Error: no se pudo encontrar el producto a eliminar");
    } else {
      cart.productos = productosFiltrados;
      await carritoApi.deleteById(id, filepathCart);
      await carritoApi.save(cart, filepathCart);
      res.send(cart);
    }
  }
});

export { routerCarrito };
