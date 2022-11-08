import { contenedorFS } from "../Containers/contenedorFS.js"

const productApi = new contenedorFS("productos")

const messageApi = new contenedorFS("mensajes")

export { productApi, messageApi }