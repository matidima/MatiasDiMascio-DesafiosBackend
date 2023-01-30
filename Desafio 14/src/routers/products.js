import { Router } from "express";
import { ProductController } from "../controllers/products.js";
import { IncorrectRoute } from "../middlewares/routeError.js";

const router = Router();

router.get('/', ProductController.getAll)

router.get("/:id", ProductController.getById)

router.post('/', ProductController.createProduct)

router.delete("/:id", ProductController.deleteProduct)

router.get('*', IncorrectRoute.errorRoutes)

export {router as ProductRouter}