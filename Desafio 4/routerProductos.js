import { Router } from "express";
import { contenedor } from "./contenedor.js";

const routerProductos = Router();
const ProductContainer = new contenedor()

routerProductos.get('/', (req, res) => {
    const productos = ProductContainer.getAll()
    res.send(productos)
})

routerProductos.get('/:id', (req, res) => {
    const {id} = req.params;
    const producto = ProductContainer.getById(Number(id))
    res.send(producto)
})

routerProductos.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body
    const producto = ProductContainer.save({ title, price, thumbnail})
    res.send({success: true, data: {id: producto.id}})
})

routerProductos.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body
    const producto = ProductContainer.updateById(id, { title, price, thumbnail})
    res.send({success: true, data: {updated: producto}})
})

routerProductos.delete("/:id", (req,res) => {
    const {id} = req.params;
    ProductContainer.deleteById(id)
    const productos = ProductContainer.getAll()
    res.send({success: true, data: productos})
})

export {routerProductos}