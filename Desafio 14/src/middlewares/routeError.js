import logger from "../utils/loggers.js"

const errorRoutes = async (req, res, next) => {
    try {
        logger.warn('Ruta inexistente')
        res.redirect('/')
        next()
    } catch (error) {
        logger.error(`error with route: ` + error)
    }
}

export const IncorrectRoute = { errorRoutes }