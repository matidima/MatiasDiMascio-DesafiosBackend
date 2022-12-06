import { DATE_UTILS } from '../utils/date.js'
import { ProductDao, CartDao } from '../dao/index.js'


const saveCart = async (req, res) => {
    try {
        const startCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
        const cart = await CartDao.save(startCart)
        res.send({ success: true, cartId: cart.id })
    } catch (error) {
        console.log(error, `error from saveCart`);
        res.send({ success: false, data: undefined, message: `carrito no encontrado` })
    }
}

const updatedCartById = async (req, res) => {
    try {
        const { productId } = req.body
        const { cartId } = req.params


        const cart = await CartDao.getById(cartId)
        if (!cart) return res.send({ error: true, message: `carrito no encontrado` })

        const product = await ProductDao.getById(productId)
        if (!product) return res.send({ error: true, message: `producto no encontrado` })

        cart.products.push(product)

        const updatedCart = await CartDao.updateById(cartId, cart)

        res.send({ success: true, cart: updatedCart })
    } catch (error) {
        console.log(error, `error from updatedCartById`);
        res.send({ success: false, data: undefined, message: `carrito no encontrado` })
    }
}

const deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.deleteById(cartId)
        if (!cart) return res.send({ success: false, message: `carrito no encontrado` })

        res.send({ success: true, data: cart })
    } catch (error) {
        console.log(error, `error from deleteCart`);
        res.send({ success: false, data: undefined, message: `carrito no encontrado` })
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const { cartId } = req.params
        const { id_prod } = req.params

        const cart = await CartDao.getById(cartId)
        if (!cart) { res.send({ error: true, message: `carrito no encontrado` }) }
        else {
            const product = await ProductDao.getById(id_prod)
            if (!product) return res.send({ error: true, message: `producto no encontrado` })

            const foundElementIndex = cart.productos.findIndex(element => element.id == id_prod)

            if (foundElementIndex === -1) return res.send({ error: true, message: `producto no encontrado` })
            cart.productos.splice(foundElementIndex, 1)

            res.send({ success: true, message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}` })
        }

        const updatedCart = await CartDao.updateById(cartId, cart)
        res.send({ success: true, cart: updatedCart })

    } catch (error) {
        console.log(error, `error from deleteProductFromCart`);
        res.send({ success: false, data: undefined, message: `carrito no encontrado` })
    }
}

const productsInCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.getById(cartId)
        if (!cart) return res.send({ error: true, message: `carrito no encontrado` })

        const productsInCart = await cart.products

        res.send({ success: true, productsInCart: productsInCart })

    } catch (error) {
        console.log(error, `error from productsInCart`);
        res.send({ success: false, data: undefined, message: `carrito no encontrado` })
    }

}

const cartById = async (req, res) => {
    try {
        const { id } = req.params

        const cart = await CartDao.getById(id)

        res.send({ success: true, cart })

    } catch (error) {
        console.log(error, `error from cartById`);
        res.send({ success: false, data: undefined, message: `carrito no encontrado` })
    }
}

export const CartController = { saveCart, updatedCartById, deleteCart, deleteProductFromCart, productsInCart, cartById }