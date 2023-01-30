import { ProductDao } from '../daos/index.js'
import logger from "../utils/loggers.js";
import { getTimestamp } from "../utils/date.js";

const getAll = async (req, res) => {
    try {
        const productos = await ProductDao.getAll()
        res.render( 'form-products', { productos })
    } catch (error) {
        console.log("getAll error:" + error )
        logger.error("getAll error:" + error )
        res.send( "Productos no encontrados" )
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.getById(id)
        if (!product) {
            return res.send({ success: false, message: "Producto no encontrado" })
        }
        res.render('product-id', { producto: product })
    } catch (error) {
        console.log("getById error:" + error )
        logger.error("getById error:" + error )
        res.send( "Producto no encontrado" )
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body

        const product = { title, description, code, price, thumbnail, stock, timestamp: getTimestamp() }
        await ProductDao.save(product)

        res.redirect('/products')

    } catch (error) {
        console.log("createProduct error:" + error )
        logger.error("createProduct error:" + error )
        res.send( "Producto no encontrado" )
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.deleteById(id)

        if (!product) {
            return res.send({ success: false, data: undefined, message: "Producto no encontrado" })
        }

        res.redirect('/products')
    } catch (error) {
        console.log("deleteProduct error:" + error )
        logger.error("deleteProduct error:" + error )
        res.send( "Producto no encontrado" )
    }

}

export const ProductController = { getAll, getById, createProduct, deleteProduct }