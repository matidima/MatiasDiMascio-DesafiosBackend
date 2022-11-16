class contenedorSQL {
  constructor(knex, tableName) {
    this.knex = knex;
    this.table = tableName;
  }

  async getAll() {
    try {
      const res = await this.knex.select("*").from(this.table);
      return res;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const res = await this.knex.insert(element).into(this.table);
      return res;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const res = await 
        this.knex.from("productos")
        .select("id", "titulo", "precio", "thumbnail")
        .where("id", id);
      return res;
    } catch (e) {
      console.log({e});
    }
  }

  async deleteById(id) {
    try {
      await this.knex.from("productos").where("id", id).delete();
    } catch (e) {
      console.log({e});
    }
  }
}

export { contenedorSQL };
