import fs from "fs";

class contenedorFS {
  constructor(fileName) {
    this.filePath = `./src/db/FS/${fileName}.json`;
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, "utf8");
      const elements = JSON.parse(file);
      return elements;
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        return [];
      }
      console.log(error);
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();
      elements.push(element);
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );
      return element;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const elements = await this.getAll();
      const foundElement = elements.find((element) => element.id == id);
      if (!foundElement) return null;
      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id == id);

      if (!foundElement) return "Element not found";

      const filterElements = elements.filter((element) => element.id != id);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(filterElements, null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export { contenedorFS };