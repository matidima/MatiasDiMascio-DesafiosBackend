import { Application, config } from './deps.ts'
const { PORT } = config()
import { router } from './routers/router.ts'
const app = new Application()
app.use( router.routes() )
console.log(`Server up on port ${PORT}`);
await app.listen({ port: Number(PORT) });