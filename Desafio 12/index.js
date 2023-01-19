import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import { AuthRouter, InfoRouter, RandomRouter } from "./src/routers/router.js";
import { config } from "./src/config/config.js";
import { MongoDBService } from "./src/services/mongoDBService.js";
import { PassportAuth } from "./src/middlewares/passportAuth.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoDBService.init()
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.DATABASE.mongo.dburl,
        dbName: config.DATABASE.mongo.dbName,
        mongoOptions,
        ttl: 6000,
        collectionName: 'sessions'
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.engine("hbs",handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
})
);
app.set("view engine", "hbs");
app.set("views", "./public/views");

PassportAuth.init()

app.use('/', AuthRouter)
app.use('/info', InfoRouter)
app.use('/api/randoms', RandomRouter)

const server = app.listen(config.SERVER.PORT, async () => {
  console.log(`Servidor escuchando en puerto ${server.address().port}`);
});