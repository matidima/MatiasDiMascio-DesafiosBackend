import knex from "knex";

const options = {
	client: 'sqlite3',
	connection: {
		filename:'./src/db/sqlite/ecommerce.sqlite'
	}
}

export const baseDeDatosSqlite = knex(options)  