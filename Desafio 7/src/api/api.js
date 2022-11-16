import { contenedorSQL } from "../Containers/contenedorSQL.js"
import { baseDeDatosMariaDB } from "../db/mariaDB/index.js"
import { baseDeDatosSqlite } from "../db/sqlite/index.js"

const productSQL = new contenedorSQL( baseDeDatosMariaDB, "productos")

const messageSQL = new contenedorSQL( baseDeDatosSqlite, "mensajes")

export { productSQL, messageSQL }