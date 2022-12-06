import { ProductDao } from "../dao/index.js";
import { DATE_UTILS } from "../utils/date.js";

/* const getAll = async (req, res) => {
    try {
        const allProducts = await ProductDao.getAll();
        res.send(allProducts)
    } catch (error) {
        console.log(error, `error from getAll`);
        res.send({ success: false, data: undefined, message: "ERRORS_UTILS.MESSAGES.NO_PRODUCT" })
    }
} */

const getAll = async (req, res) => {
  try {
    const product = await ProductDao.getAll();
    res.send(product);
  } catch (error) {
    console.log(error, `error from getAll`);
    res.send({ success: false, data: undefined, message: "ERRORS_UTILS.MESSAGES.NO_PRODUCT" })
  }
};
  
  const getById = async (req, res) => {
    const { id } = req.params;
  
    const product = await ProductDao.getById(id);
  
    res.send(product);
  };
  
  const createProduct = async (req, res) => {
    try {
      const { title, description, code, thumbnail, price, stock } = req.body;
  
      const product = {
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
        timestamp: DATE_UTILS.getTimestamp(),
      };
  
      const createdProduct = await ProductDao.save(product);
  
      res.send(createdProduct);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  };
  
  const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
  
      await ProductDao.deleteById(id);
  
      res.send({ success: true });
    } catch (error) {
      console.error(error);
      res.send({ error: "Ocurrio un error" });
    }
  };
  
  export const ProductController = {
    getAll,
    getById,
    createProduct,
    deleteById,
  };