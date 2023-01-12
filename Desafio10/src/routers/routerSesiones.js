import { Router } from "express";
import { createFakeProducts } from "../utils/faker/index.js";

const routerSesiones = Router()

routerSesiones.get('/login', (req, res) =>{
    res.render('login.hbs')
})

routerSesiones.post('/login', (req, res) =>{
    const productos = createFakeProducts(5)
    const user = "Matias"
    req.session.user = user
    res.render('loginUsuario.hbs', {
        user,
        productos
    })
})

routerSesiones.get('/logout', (req, res) =>{
    const userName = req.session.user
        req.session.destroy()
        res.render('logout.hbs', {
            userName
        })
})

export { routerSesiones }