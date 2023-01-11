import { contenedorSQL } from "../Containers/contenedorSQL.js"
import { contenedorFS } from "../Containers/contenedorFS.js"
import { baseDeDatosMariaDB } from "../db/mariaDB/index.js"

const productSQL = new contenedorSQL( baseDeDatosMariaDB, "productos")

const messageFS = new contenedorFS("mensajes")

export { productSQL, messageFS }