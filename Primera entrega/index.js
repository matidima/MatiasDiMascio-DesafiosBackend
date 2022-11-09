import express from "express";
import { routerProductos } from "./src/Routers/routerProductos.js";
import { routerCarrito } from "./src/Routers/routerCarrito.js"


const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarrito)