import { productMongo } from './products/ProductMongoDB.js'
import { cartMongo } from './carts/cartMongoDB.js'
import { MongoDBService } from '../services/mongoDB/index.js'

MongoDBService.init();
const ProductDao = new productMongo()
const CartDao = new cartMongo()

export { ProductDao, CartDao }