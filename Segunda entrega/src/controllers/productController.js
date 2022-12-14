import { ProductDao } from "../dao/index.js";
import { DATE_UTILS } from "../utils/date.js";

const getAll = async (req, res) => {
  try {
    const allProducts = await ProductDao.getAll();
    res.send({ success: true, data: allProducts });
  } catch (error) {
    console.log(error, `error from getAll`);
    res.send({
      success: false,
      data: undefined,
      message: `producto no encontrado`,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.getById(id);
    if (!product) {
      return res.send({
        success: false,
        data: undefined,
        message: `producto no encontrado`,
      });
    }
    res.send({ success: true, data: product });
  } catch (error) {
    console.log(error, `error from getById`);
    res.send({
      success: false,
      data: undefined,
      message: `producto no encontrado`,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, code, price, thumbnail, stock } = req.body;

    const product = {
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    };
    const savedProduct = await ProductDao.save(product);

    res.send(savedProduct);
  } catch (error) {
    console.log(error, `error from createProduct`);
    res.send({
      success: false,
      data: undefined,
      message: `producto no encontrado`,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.deleteById(id);

    if (!product) {
      return res.send({
        success: false,
        data: undefined,
        message: `producto no encontrado`,
      });
    }

    res.send({ success: true, data: product });
  } catch (error) {
    console.log(error, `error from deleteProduct`);
    res.send({
      success: false,
      data: undefined,
      message: `producto no encontrado`,
    });
  }
};

export const ProductController = { getAll, getById, createProduct, deleteById };
