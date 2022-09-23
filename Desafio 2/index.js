import fs from "fs"

class contenedor {
    constructor(fileName) {
        this.rutaArchivo = `./${fileName}.json`;
    }

    async getAll() {
        try {
            const file= await fs.promises.readFile(this.rutaArchivo, "utf8")
            const elements = JSON.parse(file);
            return elements;
        } catch (error) {
            console.log(error)
            if(error.code === "ENOENT")
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 3));
            return [];
        }
    }

    async save(element) {
        try {
            const elements = await this.getAll();
            const id = elements.length === 0 ? 1 : elements[elements.length -1].id + 1;
            element.id = id;
            elements.push(element);
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(elements, null, 3));
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const elements = await this.getAll();
            const foundElement = elements.find((element) => element.id == id);
            if(!foundElement) return null;
            return foundElement;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const elements = await this.getAll();
            const foundElement = elements.find((element) => element.id == id);
            if(!foundElement) return "Elemento no encontrado";
            const filterElements = elements.filter((element) => element.id != id);
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(filterElements, null, 3));
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 3));
        } catch (error) {
            console.log(error)
        }        
    }

}

const ProductContainer = new contenedor("productos")

/* ProductContainer.getAll()
    .then((data) => console.log({data}))
    .catch((error) => console.log({error})) */

/* ProductContainer.save({
    title: "Producto 1",
    price: 1000,
    thumbnail: "https://cloudfront-us-east-1.images.arcpublishing.com/culturacolectiva/KUFCDXCONRDCHFF5Z4XVP6DZKM.jpg"    
}) */

/* ProductContainer.getById(1)
    .then((data) => console.log({data}))
    .catch((error) => console.log({error})) */

/* ProductContainer.deleteById(4)
    .then((data) => console.log({data}))
    .catch((error) => console.log({error})) */

/* ProductContainer.deleteAll(); */