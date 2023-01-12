import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from 'express-handlebars'
import { routerSesiones } from "./src/routers/routerSesiones.js";
import { config } from "./src/config/index.js";
import path from 'path'

const PORT = 8080;

const app = express()

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(process.cwd() + './public')))
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
}))
app.set('view engine', 'hbs')
app.set('views', './public/views');

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.DATABASE.mongo.dburl,
        dbName: config.DATABASE.mongo.dbName,
        mongoOptions,
        ttl: 60,
        collectionName: 'sessions'
    }),
    secret: 'hola',
    resave: false,
    saveUninitialized: false,
}))

app.use('/', routerSesiones)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});