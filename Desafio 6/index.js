import express from "express";
import handlebars from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { productApi, messageApi } from "./src/api/api.js";

const PORT = 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", `/views`);

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", await messageApi.getAll());

  socket.on("mensajeNuevo", async ({ name, text }) => {
    const date = new Date();
    const message = { name, text, timestamp: date.toLocaleDateString() };
    await messageApi.save(message);

    io.sockets.emit("mensajes", await messageApi.getAll());
  });

  socket.emit("products", await productApi.getAll());

  socket.on("add-product", async (data) => {
    const products = await productApi.save(data);

    io.sockets.emit("products", await productApi.getAll());
  });
});

const server = httpServer.listen(PORT, () => {console.log(`Servidor escuchando en puerto ${PORT}`);
});

server.on("error", (error) => {console.error(`Error en el servidor ${error}`);
});