import { Router } from "express"
import { productApi } from "../container/api.js"

const routerViews = Router()

routerViews.get("/", (req, res) =>{
    res.render("form")
})

routerViews.post("/productos", (req, res) => {
    const { title, price, thumbnail } = req.body;
  
    productApi.save({ title, price, thumbnail });
  
    res.redirect("/");
  });

routerViews.get("/productos", (req, res) =>{
    const productos = productApi.getAll()
    res.render("tabla", { productos: productos })
})

export { routerViews }