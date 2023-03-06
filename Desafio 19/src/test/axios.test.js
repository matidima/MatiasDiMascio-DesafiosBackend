import { Test } from "./axios.js"

const AxiosTest = new Test

const productExample = {
    title: 'axios',
    description: 'test axios',
    code: 1111,
    price: 130000,
    thumbnail: 'https://images.fravega.com/f300/d7ca24bf5639a7db78c31aa9fa963be8.jpg.webp',
    stock: 10
}

AxiosTest.getAll()
/* AxiosTest.createProduct(productExample) */
/* AxiosTest.getById('640527fb2b1e2d407eaa4ab4') */
/* AxiosTest.deleteProduct('640527fb2b1e2d407eaa4ab4') */