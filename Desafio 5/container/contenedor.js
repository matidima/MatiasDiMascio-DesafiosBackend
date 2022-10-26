class contenedor {
    constructor() {
        this.elements = [];
    }

    getAll() {
        return this.elements;
    }

    save(element) {
        element.id = this.elements.length === 0 ? 1 : this.elements[this.elements.length - 1].id + 1
        this.elements.push(element)
        return element
    }

    getById(id) {
        console.log(this.elements)
        return this.elements.find((element) => element.id === id)
    }

    updateById(id, nuevoProducto) {
        const productoIndex = this.elements.findIndex((element) => element.id == id)
        const productoEncontrado = this.elements[productoIndex];
        if(productoIndex === -1) return undefined
        for (const key in nuevoProducto) {
            if (productoEncontrado.hasOwnProperty(key)) {
                productoEncontrado[key] = nuevoProducto[key];
            }
        }
    }

    deleteById(id) {
        const productoIndex = this.elements.findIndex((element) => element.id == id)
        console.log(productoIndex)
        this.elements.splice(productoIndex, 1);
        return {success: true}
    }
}

export { contenedor };