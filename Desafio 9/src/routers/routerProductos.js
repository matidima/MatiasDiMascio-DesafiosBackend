import { Router } from "express";
import { createFakeProducts } from "../utils/faker/index.js"

const routerProductosTest = Router();

routerProductosTest.get('/', (req, res) => {
    const productos = createFakeProducts(5)
    res.send(productos)
})

export {routerProductosTest}