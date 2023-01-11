import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getTimestamp } from "./src/utils/date/index.js";
import { productSQL, messageFS } from "./src/api/index.js";
import { routerProductosTest } from "./src/routers/routerProductos.js";

const PORT = 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  
  socket.emit("mensajes", await messageFS.getAll());
  
  socket.on("mensajeNuevo", async ({author, text}) => {

    const message = { author, text, date: getTimestamp()}
    console.log(message)
    await messageFS.save(message);
    
    io.sockets.emit("mensajes", await messageFS.getAll());
  });
  
  socket.emit("products", await productSQL.getAll());
  
  socket.on("add-product", async (data) => {
    await productSQL.save(data);
    io.sockets.emit("products", await productSQL.getAll());
  });
});

app.use('/api/productos-test', routerProductosTest)

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});