import express from "express";
import handlebars from "express-handlebars";
import { routerProductos } from "./routes/routerProductos.js";
import { routerViews } from "./routes/routerViews.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: "main.hbs"
}))
app.set("view engine", "hbs")
app.set("views", "./views")

app.use('/', routerViews)
app.use('/api/productos', routerProductos)

const server = app.listen(PORT, () => console.log("Running on port " + server.address().port))