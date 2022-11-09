import { contenedorFS } from "../container/contenedorFS.js"

const productApi = new contenedorFS("productos")

const carritoApi = new contenedorFS("carrito")

export { productApi, carritoApi }