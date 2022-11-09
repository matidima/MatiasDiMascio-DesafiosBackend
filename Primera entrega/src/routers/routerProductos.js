import fs from "fs";
import { Router } from "express";
import { productApi } from "../api/api.js";
import { admin } from "../admin/admin.js";

const routerProductos = Router();
const filePath = "productos.json";

let productos = [];

routerProductos.get("/", async (req, res) => {
  const product = await productApi.getAll(filePath);
  res.send(product);
});

routerProductos.get("/:id", async (req, res) => {
  const id = req.params.id;
  const objeto = await productApi.getById(id, filePath);
  objeto === null
    ? res.send("Error: No pudo encontrarse el producto")
    : res.send(objeto);
});

routerProductos.post("/", async (req, res) => {
  if (admin) {
    const producto = req.body;
    await productApi.save(producto, filePath);
    res.status(200).send("Producto agregado");
  }
});

routerProductos.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, codigo, thumbnail, precio, stock } = req.body;
    const product = ({
      nombre,
      descripcion,
      codigo,
      thumbnail,
      precio,
      stock,
      timestamp: getTimestamp(),
    });

    const createdProduct = await productApi.save(product);

    res.send(createdProduct);
  } catch (error) {
    res.send(error);
  }
});

routerProductos.put("/:id", async (req, res) => {
  if (admin) {
    const nuevoObjeto = req.body;
    const id = req.params.id;
    const elementos = await productApi.getAll(filePath);
    const nuevoArray = elementos.map((elemento) => {
      if (elemento.id == id) {
        nuevoObjeto.id = parseInt(id);
        return nuevoObjeto;
      }
      return elemento;
    });
    await fs.promises.writeFile(filePath, JSON.stringify(nuevoArray, null, 3));
    const elementoEditado = await productApi.GetById(id, filePath);
    if (elementoEditado === null) {
      res.send("Error: No pudo encontrarse el producto");
    } else {
      res.send(elementoEditado);
    }
  } else {
    res.send("Ruta no autorizada");
  }
});

routerProductos.delete("/:id", async (req, res) => {
  if (admin) {
    const id = req.params.id;
    const elementosFiltrados = await productApi.deleteById(id, filePath);
    if (elementosFiltrados === null) {
      res.send("Error: No pudo encontrarse el producto");
    } else {
      res.send(elementosFiltrados);
    }
  }
});

export { routerProductos };
