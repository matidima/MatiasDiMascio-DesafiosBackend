/* import { Router } from "express"; */
import Router from 'koa-router'
import { ProductController } from "../controllers/index.js";
import { IncorrectRoute } from "../middlewares/index.js";

const router = new Router({ prefix: '/products' })

router.get('/', ProductController.getAll)

router.post('/create', ProductController.createProduct)

router.get("/:id", ProductController.getById)

router.delete("/:id", ProductController.deleteProduct)

export {router as ProductRouter}