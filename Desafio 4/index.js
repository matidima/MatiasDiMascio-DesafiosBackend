import express from "express";
import { routerProductos } from "./routerProductos.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use('/api/productos', routerProductos)

const server = app.listen(PORT, () => console.log("Running on port " + server.address().port))