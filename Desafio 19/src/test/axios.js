import axios from "axios";

class Test {
    constructor() { }

    async getAll() {
        try {
            const url = 'http://localhost:8080/products'
            const response = await axios.get(url)
            console.log(response.data);
            console.log('TODOS LOS PRODUCTOS LOCALIZADOS POR EL TEST AXIOS')
        } catch (error) {
            console.log('Error en TEST AXIOS getAll', error);
        }
    }

    async createProduct(product) {
        try {
            const url = 'http://localhost:8080/products/create'
            const response = await axios.post(url, product)
            console.log(response.data);
            console.log('PRODUCTO CREADO POR AXIOS')
        } catch (error) {
            console.log('Error en TEST AXIOS createProduct', error);
        }
    }

    async getById(id) {
        try {
            const url = `http://localhost:8080/products/${id}`
            const response = await axios.get(url)
            console.log(response.data);
            console.log('PRODUCTO ENCONTRADO POR TEST AXIOS')
        } catch (error) {
            console.log('Error en TEST AXIOS getById', error);

        }
    }

    async deleteProduct(id) {
        try {
            const url = `http://localhost:8080/products/${id}`
            const response = await axios.delete(url)
            console.log(response.data);
            console.log('PRODUCTO ELIMINADO POR TEST AXIOS');
        } catch (error) {
            console.log('Error en TEST AXIOS deleteProduct', error);
        }
    }
}


export { Test }