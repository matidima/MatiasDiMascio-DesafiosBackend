import cluster from 'cluster'
import { ProductRouter } from "./src/routers/router.js";
import { config } from "./src/config/config.js";
import { INFO } from "./src/utils/info.js";
import { MongoDBService } from "./src/services/mongoDBService.js";
import koa from "koa";
import { koaBody } from "koa-body";


export const app = new koa();

app.use(koaBody())
app.use(ProductRouter.routes())
MongoDBService.init()

const MODO = config.SERVER.MODO

if (MODO === "CLUSTER") {
    if (cluster.isPrimary) {
        const server = app.listen(config.SERVER.PORT, async () => {
            console.log(`Servidor escuchando en puerto ${server.address().port}`);
          });
          server.on('error', error => console.log(`Error del servidor: ${error}`))
        console.log(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`);
        
        for (let i = 0; i < INFO.numeroProcesadores; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            console.log(`Worker ${worker.process.pid} finalizado.`);
        });
    } else {
        console.log(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    console.log(`Server inciado en modo fork`);
    const server = app.listen(config.SERVER.PORT, async () => {
      console.log(`Servidor escuchando en puerto ${server.address().port}`);
    });
    server.on('error', error => console.log(`Error del servidor: ${error}`))
}