import fs from "fs";
import { Router } from 'express'
import { carritoApi } from "../api/api.js";
import { admin } from "../admin/admin.js";

const filepathProductos = 'productos.json'
const filepathCart = 'carrito.json'
const routerCarrito = Router();
const carrito = {
    timestamp: new Date(),
    productos: []
}

routerCarrito.get('/', async (req,res) => {
    const carrito = await carritoApi.getAll(filepathCart)
    res.send(carrito)
})

routerCarrito.post('/', async (req, res) => {
    await carritoApi.save(carrito,filepathCart)
    const elementos = await carritoApi.getAll(filepathCart)
    res.send(elementos)
})

routerCarrito.delete('/:id', async (req, res) => {
    const id = req.params.id
    await carritoApi.deleteById(id,filepathCart)
    const carritos = await carritoApi.getAll(filepathCart)
    res.send(carritos)
})

routerCarrito.get('/:id/productos', async (req, res) => {
    const id = req.params.id
    const objeto = await carritoApi.getById(id,filepathCart)
    console.log(typeof(objeto.elemento.productos))
    res.send(objeto.elemento.productos)
})

routerCarrito.post('/:id/productos', async (req, res) => {
    const id = req.params.id
    let producto = await carritoApi.getById(id,filepathProductos)
    producto = producto.elemento
    if(producto === null){
        res.send('Error: No pudo encontrarse el producto')
      }else{
        let cart = await getById(1,filepathCart)
        cart = cart.elemento
        const productos = cart.productos
        productos.push(producto)
        cart.productos = productos

        await carritoApi.deleteById(1,filepathCart)
        await carritoApi.save(cart,filepathCart)

        res.send(productos)
    }
})

routerCarrito.delete('/:id_cart/productos/:id_prod', async (req,res) => {
    const {id_cart} = req.params
    const {id_prod} = req.params
    let cart = await carritoApi.getById(id_cart,filepathCart)
    if(cart === null){
        res.send('Error: no se pudo encontrar el carrito')
    }else{
        cart = cart.elemento
        const productosFiltrados = cart.productos.filter((elemento) => elemento.id != id_prod)
        if(productosFiltrados === null){
            res.send('Error: no se pudo encontrar el producto a eliminar')
        }else{
            cart.productos = productosFiltrados
            await carritoApi.deleteById(id_cart,filepathCart)
            await carritoApi.save(cart,filepathCart)
            res.send(cart)
        }
    }
})

export { routerCarrito };