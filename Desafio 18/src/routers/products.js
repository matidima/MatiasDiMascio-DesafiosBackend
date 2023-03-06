import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { IncorrectRoute } from "../middlewares/index.js";

const router = Router();

router.get('/', ProductController.getAll)

router.get('/create', ProductController.viewsFormProducts)

router.post('/create', ProductController.createProduct)

router.get("/:id", ProductController.getById)

router.delete("/:id", ProductController.deleteProduct)

router.get('*', IncorrectRoute.errorRoutes)

export {router as ProductRouter}