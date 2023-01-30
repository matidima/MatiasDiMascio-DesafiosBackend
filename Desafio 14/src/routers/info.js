import { Router } from "express";
import compression from "compression";
import { INFO } from "../../src/utils/info.js"
import { IncorrectRoute } from "../middlewares/routeError.js";

const router = Router()

router.get('/', (req, res) => {
    const data = INFO
    /* console.log(data) */
    res.render('info.hbs', { data })
})

router.get('/compresion', compression(), (req, res) => {
    const data = INFO
    res.render('info.hbs', { data })
})

router.get('*', IncorrectRoute.errorRoutes)

export { router as InfoRouter }