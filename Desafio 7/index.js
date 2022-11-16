import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { productSQL, messageSQL } from "./src/api/api.js";

const PORT = 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", await messageSQL.getAll());

  socket.on("mensajeNuevo", async ({ name, text }) => {
    const date = new Date();
    const message = { name, text, timestamp: date.toLocaleDateString() };
    await messageSQL.save(message);

    io.sockets.emit("mensajes", await messageSQL.getAll());
  });

  socket.emit("products", await productSQL.getAll());

  socket.on("add-product", async (data) => {
    await productSQL.save(data);
    io.sockets.emit("products", await productSQL.getAll());
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});