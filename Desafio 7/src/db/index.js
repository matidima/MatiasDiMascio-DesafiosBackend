import { baseDeDatosMariaDB } from "./mariaDB/index.js";
import { baseDeDatosSqlite } from "./sqlite/index.js";

baseDeDatosMariaDB.schema.createTable('productos', table => {
	table.increments();
    table.string("title");
    table.integer("price");
    table.string("thumbnail");
})
.then(() => console.log('Table created'))
.catch(err => console.log({err}) )
  
baseDeDatosSqlite.schema.createTable('mensajes', table => {
    table.increments("id");
    table.string("name");
    table.string("text");
    table.string("timestamp");
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err); })
  