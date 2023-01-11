import { normalize, schema, denormalize } from "normalizr";
import { messageFS } from "../../api/index.js";
import util from "util";

const mensajesJSON = await messageFS.getAll()
const mensajesArray = {id:"mensajes", mensajes: [...mensajesJSON]}

const author = new schema.Entity('author')
const mensajes = new schema.Entity('messages', {
    author: [author]
})

const normalizrData = normalize(mensajesArray, mensajes)
console.log('------------------ Datos normalizados ------------------');
console.log(util.inspect(normalizrData,false,12,true));


const dataOriginal = denormalize(normalizrData.result, mensajes, normalizrData.entities)
console.log('------------------ Datos denormalizados ------------------');
console.log(util.inspect(dataOriginal,false,12,true));

const normalElement = parseInt(JSON.stringify(normalizrData).length)
const originalElement = parseInt(JSON.stringify(dataOriginal).length)

console.log(JSON.stringify(mensajesArray).length);
console.log(JSON.stringify(normalizrData).length);

export function porcent(firstElement, secondElement) {
    const porcents = ((firstElement / secondElement * 100) - 100).toFixed(2)
    console.log(`El porcentaje de compresion fue del ${porcents}%`);
}

porcent(normalElement, originalElement)