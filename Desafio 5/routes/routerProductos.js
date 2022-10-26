import { Router } from "express";
import { productApi } from "../container/api.js";

const routerProductos = Router();

routerProductos.get('/', (req, res) => {
    const productos = productApi.getAll()
    res.send(productos)
})

routerProductos.get('/:id', (req, res) => {
    const {id} = req.params;
    const producto = productApi.getById(Number(id))
    res.send(producto)
})

routerProductos.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body
    const producto = productApi.save({ title, price, thumbnail})
    res.send({success: true, data: {id: producto.id}})
})

routerProductos.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body
    const producto = productApi.updateById(id, { title, price, thumbnail})
    res.send({success: true, data: {updated: producto}})
})

routerProductos.delete("/:id", (req,res) => {
    const {id} = req.params;
    productApi.deleteById(id)
    const productos = productApi.getAll()
    res.send({success: true, data: productos})
})

export {routerProductos}