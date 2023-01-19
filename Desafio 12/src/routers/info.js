import { Router } from "express";
import { INFO } from "../../src/utils/info.js"

const router = Router()

router.get('/', (req, res) => {
    const data = INFO
    res.render('info.hbs', { data })
})

export { router as InfoRouter }