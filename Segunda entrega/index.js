import express from 'express'
import { ProductRouter } from './src/routers/ProductRouter.js'
import { CartRouter } from './src/routers/cartRouter.js'

import { config } from './src/config/index.js'

const app = express()


app.use('/', express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', ProductRouter)
app.use('/api/carritos', CartRouter)


app.listen(config.SERVER.PORT, () => console.log(`Server listening on PORT ${config.SERVER.PORT}`))
app.on('error', error => console.log(`Error del servidor: ${error}`))